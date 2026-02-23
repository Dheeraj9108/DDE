package com.dde.dto;

import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class AddCollaboratorsDTO {
	private UUID projectId;
	private UUID groupId;
	private List<CollaboratorDTO> collaborators;
}
