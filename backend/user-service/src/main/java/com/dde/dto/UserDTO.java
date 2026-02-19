package com.dde.dto;

import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class UserDTO {
	
	private UUID id;
	private String username;
	private String password;
	private List<GroupDTO> groups;
}
