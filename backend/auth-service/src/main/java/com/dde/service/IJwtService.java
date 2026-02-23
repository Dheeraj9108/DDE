package com.dde.service;

import com.dde.model.AuthUserDetails;

public interface IJwtService {
	
	public void validateToken(final String token);
	
	public String generateToken(AuthUserDetails user);
}
