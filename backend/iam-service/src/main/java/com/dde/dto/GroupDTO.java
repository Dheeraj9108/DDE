package com.dde.dto;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import lombok.Data;

@Data
public class GroupDTO {
	
	private UUID id;
	private UserDTO owner;
	private String name;
	private String description;
	private UUID inviteCode;
	private LocalDateTime createdAt;
	private Set<UserDTO> members;
}
