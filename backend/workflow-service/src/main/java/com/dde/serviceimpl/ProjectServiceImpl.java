package com.dde.serviceimpl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dde.dto.ProjectListDTO;
import com.dde.dto.ProjectRequestDTO;
import com.dde.model.Project;
import com.dde.repository.ProjectRepository;
import com.dde.service.IProjectService;
import com.dde.util.DtoModelMapper;

@Service
public class ProjectServiceImpl implements IProjectService {

	@Autowired
	private ProjectRepository projectRepo;

	@Autowired
	private DtoModelMapper dtoMapper;

	@Override
	public List<ProjectListDTO> getAllProjects(UUID groupId) {
		return dtoMapper.toProjectDTOs(projectRepo.findByGroupId(groupId));
	}

	@Override
	public void createProject(ProjectRequestDTO projectDTO) {
		Project project = dtoMapper.toProjectModel(projectDTO);		
		projectRepo.save(project);
	}

	@Override
	public void updateProject(ProjectRequestDTO projectDTO) {
		Project project = dtoMapper.toProjectModel(projectDTO);		
		projectRepo.save(project);
	}
	
	@Override
	public void deleteProject(UUID id) {
		projectRepo.deleteById(id);
	}
}
