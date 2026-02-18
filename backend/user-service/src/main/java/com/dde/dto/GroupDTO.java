package com.dde.dto;

import java.util.Set;
import java.util.UUID;

import lombok.Data;

@Data
public class GroupDTO {
	
	private UUID id;
	private UserDTO owner;
	private String name;
	private String descption;
	private Set<UserDTO> members;
}
