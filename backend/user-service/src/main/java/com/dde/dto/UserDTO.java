package com.dde.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class UserDTO {
	
	private UUID id;
	private String username;
	private String password;
	
}
