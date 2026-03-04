package com.dde.dto;

import java.util.Set;
import java.util.UUID;

import com.dde.enums.ProjectRole;

import lombok.Data;

@Data
public class CollaboratorDTO {
	private UUID id;
	private UUID userId;
	private String name;
	private String email;
	private boolean reviewer;
	private Set<ProjectRole> roles;
}
