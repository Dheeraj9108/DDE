package com.dde.dto;

import java.util.List;
import java.util.UUID;

import com.dde.enums.Role;

import lombok.Data;

@Data
public class UserDTO {
	
	private UUID id;
	private String username;
	private String password;
	private String email;
	private List<GroupDTO> groups;
	private List<Role> roles;
	private boolean projectOwner;
}
