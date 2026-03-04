package com.dde.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dde.dto.ManageCollaboratorsDTO;
import com.dde.dto.ProjectDTO;
import com.dde.dto.ProjectListDTO;
import com.dde.service.IProjectService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/projects")
public class ProjectController {
	
	@Autowired
	private IProjectService projectService;
	
	@GetMapping("/{groupId}/getAllProjects")
	public ResponseEntity<List<ProjectListDTO>> getAllProjects(@PathVariable("groupId") UUID groupId) {
		return ResponseEntity.ok(projectService.getAllProjects(groupId));
	}
	
	@PostMapping
	public ResponseEntity<String> createProject(@RequestHeader("X-USER-INFO") String userContextObj,@RequestBody() ProjectDTO projectDTO) {
		projectService.createProject(projectDTO, userContextObj);
		return new ResponseEntity<>("Project Created Sussfully",HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<String> updateProject(@RequestBody() ProjectDTO projectDTO) {
		projectService.updateProject(projectDTO);
		return new ResponseEntity<>("Project Created Sussfully",HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteFlowTemplate(@PathVariable("id") UUID id) {
		projectService.deleteProject(id);
		return new ResponseEntity<>("Flow Deleted Successfully",HttpStatus.OK);
	}
	
	@PostMapping("/manageCollaborators")
	public ResponseEntity<String> manageCollaborator(@RequestBody ManageCollaboratorsDTO collaboratorsDTO){
		projectService.manageCollaborators(collaboratorsDTO);
		return ResponseEntity.ok("Collaborators Updated Successfully");
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ProjectDTO> getProjectById(@PathVariable("id") UUID id){
		return ResponseEntity.ok(projectService.getProjectById(id));
	}
	
}
