package com.dde.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.dde.feign.UserServiceFeignClient;
import com.dde.model.AuthUserDetails;
import com.dde.model.User;

import feign.FeignException;

@Component
public class AuthUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserServiceFeignClient userServiceFeignClient;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			User user = userServiceFeignClient.getUserByUsername(username);
			return new AuthUserDetails(user);
		} catch (FeignException.NotFound e) {
			throw new UsernameNotFoundException("Invalid Username Password",e);
		} catch (FeignException e) {
			throw new UsernameNotFoundException("Unable to login",e);
		}
	}

}
