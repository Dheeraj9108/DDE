package com.dde.service;

import com.dde.dto.LoginRequestDTO;
import com.dde.dto.SignupRequestDTO;

public interface IAuthService {
	
	String login(LoginRequestDTO loginRequestDTO);
	
	void signup(SignupRequestDTO signupRequestDTO);
}
