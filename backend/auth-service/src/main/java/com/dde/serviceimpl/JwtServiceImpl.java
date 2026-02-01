package com.dde.serviceimpl;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.dde.service.IJwtService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtServiceImpl implements IJwtService {

	@Value("${jwt.secret}")
	private String secretKey;

	private Key getSignKey() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
	}
	
	private String createToken(Map<String, Object> claims, String username) {
		return Jwts.builder()
				   .setClaims(claims)
				   .setSubject(username)
				   .setIssuedAt(new Date(System.currentTimeMillis()))
				   .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
				   .signWith(getSignKey(), SignatureAlgorithm.HS256)
				   .compact();
	}

	@Override
	public void validateToken(final String token) {
		Jwts.parserBuilder()
			.setSigningKey(getSignKey())
			.build()
			.parseClaimsJws(token);
	}
	
	@Override
	public String generateToken(String username) {
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, username);
	}

	

}
