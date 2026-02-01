package com.dde.service;

public interface IJwtService {
	
	public void validateToken(final String token);
	
	public String generateToken(String username);
}
