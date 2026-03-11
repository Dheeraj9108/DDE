package com.dde.serviceimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dde.dto.GroupDTO;
import com.dde.dto.JoinGroup;
import com.dde.dto.UserContextDTO;
import com.dde.dto.UserDTO;
import com.dde.model.Group;
import com.dde.model.User;
import com.dde.model.UserGroup;
import com.dde.repository.GroupRepository;
import com.dde.repository.UserGroupRepository;
import com.dde.repository.UserRepository;
import com.dde.service.IGroupService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements IGroupService {

	private final UserRepository userRepo;

	private final GroupRepository groupRepo;
	
	private final UserGroupRepository userGroupRepo;

	@Override
	@Transactional
	public GroupDTO createGroup(GroupDTO groupDTO) {
		User owner = userRepo.findById(groupDTO.getOwner().getId()).orElseThrow();

		Group group = new Group();
		group.setName(groupDTO.getName());
		group.setDescription(groupDTO.getDescription());
		group.setOwner(owner);
		group.setMembers(Set.of(owner));
		group.setInviteCode(UUID.randomUUID());
		groupRepo.save(group);

		owner.getGroups().add(group);
		userRepo.save(owner);

		GroupDTO savedGroup = new GroupDTO();
		savedGroup.setId(group.getId());
		savedGroup.setDescription(group.getDescription());
		savedGroup.setName(group.getName());
		savedGroup.setInviteCode(group.getInviteCode());
		savedGroup.setCreatedAt(group.getCreatedAt());
		return savedGroup;
	}

	@Override
	public GroupDTO getById(UUID id) {
		Group group = groupRepo.findById(id).orElseThrow();

		Set<UserDTO> members = group.getMembers().stream().map(user -> {
			UserDTO member = new UserDTO();
			member.setUsername(user.getUsername());
			return member;
		}).collect(Collectors.toSet());
		
		GroupDTO groupDTO = new GroupDTO();
		groupDTO.setMembers(members);
		groupDTO.setId(group.getId());
		groupDTO.setInviteCode(group.getInviteCode());
		
		UserDTO owner = new UserDTO();
		owner.setUsername(group.getOwner().getUsername());
		groupDTO.setOwner(owner);
		groupDTO.setCreatedAt(group.getCreatedAt());
		groupDTO.setName(group.getName());
		return groupDTO;
	}

	@Override
	@Transactional
	public GroupDTO joinGroup(JoinGroup joinGroupDTO,String userContextObj) {
		GroupDTO savedGroup = new GroupDTO();
		try {
			UserContextDTO userContext = new ObjectMapper().readValue(userContextObj, UserContextDTO.class);
			User user = userRepo.findByUsername(userContext.getUsername()).orElseThrow();
			Group group = groupRepo.findByInviteCode(joinGroupDTO.getCode()); 
			user.getGroups().add(group);
		
			savedGroup.setId(group.getId());
			savedGroup.setDescription(group.getDescription());
			savedGroup.setName(group.getName());
			savedGroup.setInviteCode(group.getInviteCode());
			savedGroup.setCreatedAt(group.getCreatedAt());
		} catch(JsonProcessingException e) {
			e.printStackTrace();
		}
		return savedGroup;
	}
	
	public List<UserDTO> getMembersByGroupId(UUID id) {
		List<User> users = groupRepo.findMembersByGroupId(id);
		List<UserGroup> existingUsers = userGroupRepo.findByGroupId(id);
		Map<UUID, UserGroup> userMap = existingUsers.stream().collect(Collectors.toMap(UserGroup::getUserId, Function.identity()));
		return users.stream().map(user->{
			UserGroup ug = userMap.get(user.getId());
			UserDTO userDTO = new UserDTO();
			userDTO.setId(user.getId());
			userDTO.setUsername(user.getUsername());
			userDTO.setEmail("dhe@gmail.com");
			if(ug != null) {				
				userDTO.setRoles(ug.getRoles());
				userDTO.setProjectOwner(ug.isProjectOwner());
			}
			return userDTO;
		}).collect(Collectors.toList());
	}
	
	@Override
	public void updateRolesAndPermissions(List<UserDTO> users, UUID groupId) {
		List<UUID> userIds = users.stream().map(UserDTO::getId).collect(Collectors.toList());
		List<UserGroup> existingUsers = userGroupRepo.findByUserIdInAndGroupId(userIds, groupId);
		Map<UUID, UserGroup> userMap = existingUsers.stream().collect(Collectors.toMap(UserGroup::getUserId, Function.identity()));
		
		List<UserGroup> toSave = new ArrayList<>();
		for(UserDTO user : users) {
			UserGroup u = userMap.get(user.getId());
			if(u == null) {
				UserGroup ug = new UserGroup();
				ug.setUserId(user.getId());
				ug.setGroupId(groupId);
				ug.setProjectOwner(user.isProjectOwner());
				ug.setRoles(user.getRoles());
				toSave.add(ug);
			} else {
				u.setRoles(user.getRoles());
				u.setProjectOwner(user.isProjectOwner());
				toSave.add(u);
			}
		}
		userGroupRepo.saveAll(toSave);
	}
}
