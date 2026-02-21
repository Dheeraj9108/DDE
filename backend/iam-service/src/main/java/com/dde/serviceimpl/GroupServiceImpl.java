package com.dde.serviceimpl;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dde.dto.GroupDTO;
import com.dde.dto.JoinGroup;
import com.dde.dto.UserDTO;
import com.dde.model.Group;
import com.dde.model.User;
import com.dde.repository.GroupRepository;
import com.dde.repository.UserRepository;
import com.dde.service.IGroupService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements IGroupService {

	private final UserRepository userRepo;

	private final GroupRepository groupRepo;

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
	public GroupDTO joinGroup(JoinGroup joinGroupDTO,String username) {
		User user = userRepo.findByUsername(username).orElseThrow();
		Group group = groupRepo.findByInviteCode(joinGroupDTO.getCode()); 
		user.getGroups().add(group);
		
		GroupDTO savedGroup = new GroupDTO();
		savedGroup.setId(group.getId());
		savedGroup.setDescription(group.getDescription());
		savedGroup.setName(group.getName());
		savedGroup.setInviteCode(group.getInviteCode());
		savedGroup.setCreatedAt(group.getCreatedAt());
		return savedGroup;
	}
}
