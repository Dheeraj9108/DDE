package com.dde.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dde.dto.GroupDTO;
import com.dde.dto.JoinGroup;
import com.dde.dto.UserDTO;
import com.dde.service.IGroupService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {

	private final IGroupService groupService;
	
	@PostMapping("/")
	public ResponseEntity<GroupDTO> createGroup(@RequestBody GroupDTO groupDTO){
		return ResponseEntity.status(HttpStatus.CREATED).body(groupService.createGroup(groupDTO));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<GroupDTO> getById(@PathVariable("id") UUID id){
		return ResponseEntity.status(HttpStatus.OK).body(groupService.getById(id));
	}
	
	@PostMapping("/join")
	public ResponseEntity<GroupDTO> joinGroup(@RequestHeader("X-USER-INFO") String userContextObj,@RequestBody JoinGroup joinGroupDTO){
		return ResponseEntity.status(HttpStatus.CREATED).body(groupService.joinGroup(joinGroupDTO,userContextObj)); 
	}
	
	@GetMapping("/getAllUsers/{groupId}")
	public ResponseEntity<List<UserDTO>> getAllUsers(@PathVariable("groupId") UUID groupId){
		return ResponseEntity.ok(groupService.getMembersByGroupId(groupId));
	}
	
	@PostMapping("/{groupId}/roles-permissions")
	public ResponseEntity<String> updateRolesAndPermissions(@PathVariable("groupId") UUID groupId,@RequestBody List<UserDTO> users){
		groupService.updateRolesAndPermissions(users, groupId);
		return ResponseEntity.ok("Update Success");
	}
	
	@GetMapping
	public ResponseEntity<List<GroupDTO>> getAllGroupsForUser(@RequestHeader("X-USER-INFO") String userContextObj){
		return ResponseEntity.ok(groupService.getAllUserGroups(userContextObj));
	}
}
