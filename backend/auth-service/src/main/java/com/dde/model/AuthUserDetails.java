package com.dde.model;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthUserDetails implements UserDetails{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private UUID id;
	
	private String username;
	
	private String password;
	
	public AuthUserDetails(User user) {
		this.id = user.getId();
		this.username = user.getUsername();
		this.password = user.getPassword();
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.emptyList();
	}

	@Override
	public @Nullable String getPassword() {
		return password;
	}
	
	public @Nullable UUID getId() {
		return id;
	}

	@Override
	public String getUsername() {
		return username;
	}

}
