package com.dde.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dde.dto.GroupDTO;
import com.dde.service.IGroupService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class GroupController {

	private final IGroupService groupService;
	
	@PostMapping("/")
	public ResponseEntity<String> createGroup(@RequestBody GroupDTO groupDTO){
		groupService.createGroup(groupDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body("Group Created Successfully");
	}
		
}
