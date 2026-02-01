package com.dde.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dde.dto.UserDTO;
import com.dde.model.User;
import com.dde.service.IUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class UserController {
	
	private final IUserService userService;
	
	@GetMapping("/{username}")
	public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username){
		User user = userService.getUserByUsername(username);
		return ResponseEntity.ok(user);
	}
	
	@PostMapping("/")
	public ResponseEntity<User> createUser(@RequestBody UserDTO user){
		userService.createUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(null);
	}
}
