package com.dde.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class ProjectDTO {
	private UUID id;
	private String name;
	private String description;
	private String groupId;
	private LocalDateTime createdAt;
	private String createdBy;
	private List<CollaboratorDTO> collaborators;
	
}
