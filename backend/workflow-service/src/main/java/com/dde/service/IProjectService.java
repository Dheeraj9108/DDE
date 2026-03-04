package com.dde.service;

import java.util.List;
import java.util.UUID;

import com.dde.dto.ManageCollaboratorsDTO;
import com.dde.dto.ProjectDTO;
import com.dde.dto.ProjectListDTO;

public interface IProjectService {
	
	List<ProjectListDTO> getAllProjects(UUID groupId);
	
	void createProject(ProjectDTO projectDTO, String userContextObj);
	
	void updateProject(ProjectDTO projectDTO);
	
	void deleteProject(UUID id);
	
	void manageCollaborators(ManageCollaboratorsDTO collaboratorsDTO);
	
	ProjectDTO getProjectById(UUID id);
}
