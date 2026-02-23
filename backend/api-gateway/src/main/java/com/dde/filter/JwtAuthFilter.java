package com.dde.filter;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.dde.dto.UserContextDTO;
import com.dde.service.JwtService;
import com.dde.validator.RouteValidator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
					String userInfo = getUserContextObject(claims);
					ServerHttpRequest mutatedRequest = exchange.getRequest()
					        .mutate() // modified copy of the request
					        .header("X-USER-INFO",userInfo)
					        .build();
					return chain.filter(exchange.mutate().request(mutatedRequest).build());
				} catch (Exception e) {
					return onError(exchange,"Invalid JWT Token",HttpStatus.UNAUTHORIZED);
				}
			}
			
			return chain.filter(exchange);
		};
	}
	
	private String getUserContextObject(Claims claims) {
		UserContextDTO user = new UserContextDTO();
		user.setId(UUID.fromString(claims.get("id", String.class)));
		user.setUsername(claims.getSubject());
		
		ObjectMapper mapper = new ObjectMapper();
		String userJson = "";
		try {
			userJson = mapper.writeValueAsString(user);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return userJson;
	}
	
	private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus){
		exchange.getResponse().setStatusCode(httpStatus);
		return exchange.getResponse().setComplete();
	}
}
