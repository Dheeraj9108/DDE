package com.dde.service;

import java.util.List;
import java.util.UUID;

import com.dde.dto.ProjectListDTO;
import com.dde.dto.ProjectRequestDTO;

public interface IProjectService {
	
	List<ProjectListDTO> getAllProjects(UUID groupId);
	
	void createProject(ProjectRequestDTO projectDTO);
	
	void updateProject(ProjectRequestDTO projectDTO);
	
	void deleteProject(UUID id);
}
