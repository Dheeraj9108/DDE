package com.dde.model;

import java.util.UUID;

import lombok.Data;

@Data
public class User {
			
	private UUID id;
	private String username;
	private String password;
	
}
