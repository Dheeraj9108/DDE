package com.dde.controller;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dde.dto.LoginRequestDTO;
import com.dde.dto.ResponseDTO;
import com.dde.dto.SignupRequestDTO;
import com.dde.service.IAuthService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	
	private final IAuthService authService;
	
	@PostMapping("/login")
	public ResponseEntity<ResponseDTO<String>> login(@RequestBody LoginRequestDTO loginRequestDTO) {
		String token = authService.login(loginRequestDTO);
		ResponseDTO<String> response = new ResponseDTO<>();
		response.setSuccess(true);
		response.setData(token);
		response.setStatus(HttpStatus.OK.value());
		response.setMessage(token);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<ResponseDTO<String>> signup(@RequestBody SignupRequestDTO signupRequestDTO) {
		authService.signup(signupRequestDTO);
		ResponseDTO<String> response = new ResponseDTO<>();
		response.setData("Signup Success");
		response.setStatus(HttpStatus.CREATED.value());
		response.setTimestamp(LocalDateTime.now());
		response.setMessage("Signup Success");
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
}
