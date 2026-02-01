package com.dde.serviceimpl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dde.dto.LoginRequestDTO;
import com.dde.dto.SignupRequestDTO;
import com.dde.feign.UserServiceFeignClient;
import com.dde.service.IAuthService;
import com.dde.service.IJwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService{
	
	private final UserServiceFeignClient userServiceFeignClient;
	
	private final PasswordEncoder passwordEncoder;
	
	private final IJwtService jwtService;
	
	private final AuthenticationManager authenticationManager;
	
	@Override
	public String login(LoginRequestDTO loginRequestDTO) {
		String token = "";
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword()));
				
		if(authentication.isAuthenticated()) {
			token = jwtService.generateToken(loginRequestDTO.getUsername());
		} else {
			throw new UsernameNotFoundException("Username Not Found");
		}
		return token;
	}

	@Override
	public void signup(SignupRequestDTO signupRequestDTO) {
		signupRequestDTO.setPassword(passwordEncoder.encode(signupRequestDTO.getPassword()));
		userServiceFeignClient.createUser(signupRequestDTO);
	}
}
