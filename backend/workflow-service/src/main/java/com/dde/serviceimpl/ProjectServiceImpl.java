package com.dde.serviceimpl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dde.dto.AddCollaboratorsDTO;
import com.dde.dto.ProjectListDTO;
import com.dde.dto.ProjectRequestDTO;
import com.dde.model.Project;
import com.dde.model.ProjectCollaborator;
import com.dde.repository.ProjectRepository;
import com.dde.service.IProjectService;
import com.dde.util.DtoModelMapper;

import jakarta.transaction.Transactional;

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
	
	@Override
	@Transactional
	public void addCollaborators(AddCollaboratorsDTO collaboratorsDTO) {
		Project project = projectRepo.findById(collaboratorsDTO.getProjectId()).orElseThrow();
		
		collaboratorsDTO.getCollaborators().forEach(member->{
			ProjectCollaborator collaborator = new ProjectCollaborator();
			collaborator.setProject(project);
			collaborator.setUserId(member.getId());
			collaborator.setRoles(member.getRoles());
			project.getCollaborators().add(collaborator);
		});
	}
}
