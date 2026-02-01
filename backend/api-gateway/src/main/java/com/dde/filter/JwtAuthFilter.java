package com.dde.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.dde.service.JwtService;
import com.dde.validator.RouteValidator;

import io.jsonwebtoken.Claims;
import jakarta.ws.rs.core.HttpHeaders;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthFilter extends AbstractGatewayFilterFactory<JwtAuthFilter.Config> {
	
	@Autowired
	private RouteValidator validator;
	
	@Autowired
	private JwtService jwtService;
	
	public JwtAuthFilter() {
		super(Config.class);
	}

	public static class Config {
		// Nothing to configure for now
	}


	@Override
	public GatewayFilter apply(Config config) {
		return (exchange,chain)->{
			
			if (exchange.getRequest().getMethod().equals(HttpMethod.OPTIONS)) {
	            return chain.filter(exchange);
	        }
			
			if(validator.isSecured.test(exchange.getRequest())) {
				
				String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
					
				if(authHeader == null || !authHeader.startsWith("Bearer ") ) {
					 return onError(exchange, "Authorization header is missing", HttpStatus.UNAUTHORIZED);
				}
				
				String token = authHeader.substring(7);
				
				try {
					Claims claims = jwtService.validateToken(token);
					ServerHttpRequest mutatedRequest = exchange.getRequest()
					        .mutate() // modified copy of the request
					        .header("X-USER-NAME",claims.getSubject() )
					        .build();
					return chain.filter(exchange.mutate().request(mutatedRequest).build());
				} catch (Exception e) {
					return onError(exchange,"Invalid JWT Token",HttpStatus.UNAUTHORIZED);
				}
			}
			
			return chain.filter(exchange);
		};
	}
	
	private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus){
		exchange.getResponse().setStatusCode(httpStatus);
		return exchange.getResponse().setComplete();
	}
}
