package com.dde.serviceimpl;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dde.dto.CollaboratorDTO;
import com.dde.dto.ManageCollaboratorsDTO;
import com.dde.dto.ProjectDTO;
import com.dde.dto.ProjectListDTO;
import com.dde.dto.UserContextDTO;
import com.dde.dto.UserDTO;
import com.dde.enums.ProjectRole;
import com.dde.feign.IAMServiceFeignClient;
import com.dde.model.Project;
import com.dde.model.ProjectCollaborator;
import com.dde.repository.ProjectRepository;
import com.dde.service.IProjectService;
import com.dde.util.DtoModelMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;

@Service
public class ProjectServiceImpl implements IProjectService {

	@Autowired
	private ProjectRepository projectRepo;

	@Autowired
	private DtoModelMapper dtoMapper;
	
	@Autowired
	private IAMServiceFeignClient iamClient;

	@Override
	public List<ProjectListDTO> getAllProjects(UUID groupId) {
		return dtoMapper.toProjectDTOs(projectRepo.findByGroupId(groupId));
	}

	@Override
	public void createProject(ProjectDTO projectDTO, String userContextObj) {
		try {
			UserContextDTO userContext = new ObjectMapper().readValue(userContextObj, UserContextDTO.class);
			Project project = dtoMapper.toProjectModel(projectDTO);		
			project.setCreatedBy(userContext.getId());
			ProjectCollaborator collaborator = new ProjectCollaborator();
			collaborator.setProject(project);
			collaborator.setUserId(userContext.getId());
			collaborator.setRoles(Set.of(ProjectRole.OWNER));
			project.setCollaborators(List.of(collaborator));
			projectRepo.save(project);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void updateProject(ProjectDTO projectDTO) {
		Project project = dtoMapper.toProjectModel(projectDTO);		
		projectRepo.save(project);
	}
	
	@Override
	public void deleteProject(UUID id) {
		projectRepo.deleteById(id);
	}
	
	@Override
	public ProjectDTO getProjectById(UUID id) {
		Project project = projectRepo.findById(id).orElseThrow();
		ProjectDTO projectDTO = dtoMapper.toProjectDTO(project);
		List<UserDTO> users = iamClient.getUserByGroupId(project.getGroupId());
		Map<UUID,UserDTO> userMap = users.stream().collect(Collectors.toMap(UserDTO::getId, Function.identity()));
		
		projectDTO.getCollaborators().forEach(collaborator->{
			UserDTO user = userMap.get(collaborator.getUserId());
			collaborator.setName(user.getUsername());
			collaborator.setEmail(user.getEmail());
			collaborator.setReviewer(collaborator.getRoles().contains(ProjectRole.REVIEWER));
		});
		
		return projectDTO;
	}
	
	@Override
	@Transactional
	public void manageCollaborators(ManageCollaboratorsDTO collaboratorsDTO) {
		Project project = projectRepo.findById(collaboratorsDTO.getProjectId()).orElseThrow();
		
		Map<UUID,ProjectCollaborator> map = project.getCollaborators().stream().collect(Collectors.toMap(ProjectCollaborator::getUserId, c->c));
		
		Set<UUID> incomingIds = new HashSet<>();
		
		for(CollaboratorDTO collaborator: collaboratorsDTO.getCollaborators()) {
			
			ProjectCollaborator projectCollaborator = map.get(collaborator.getUserId());
			
			incomingIds.add(collaborator.getUserId());
			
			if(projectCollaborator == null) {
				projectCollaborator = new ProjectCollaborator();
				projectCollaborator.setProject(project);
				projectCollaborator.setUserId(collaborator.getUserId());
				project.getCollaborators().add(projectCollaborator);
			}
			
			projectCollaborator.setRoles(collaborator.getRoles());
		}
		
		project.getCollaborators().removeIf(collaborator-> !incomingIds.contains(collaborator.getUserId()));
	}
}
