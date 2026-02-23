package com.dde.dto;

import java.util.Set;
import java.util.UUID;

import com.dde.enums.ProjectRole;

import lombok.Data;

@Data
public class CollaboratorDTO {
	private UUID id;
	private Set<ProjectRole> roles;
}
