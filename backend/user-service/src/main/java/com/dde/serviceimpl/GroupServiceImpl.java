package com.dde.serviceimpl;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.dde.dto.GroupDTO;
import com.dde.model.Group;
import com.dde.model.User;
import com.dde.repository.GroupRepository;
import com.dde.repository.UserRepository;
import com.dde.service.IGroupService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements IGroupService{
	
	private final UserRepository userRepo;
	
	@Override
	public void createGroup(GroupDTO groupDTO) {
		User owner = userRepo.findById(groupDTO.getOwner().getId()).orElseThrow();
		Group group = new Group();
		group.setName(groupDTO.getName());
		group.setDescription(group.getDescription());
		group.setOwner(owner);
		group.setMembers(Set.of(owner));
		owner.getGroups().add(group);
		userRepo.save(owner);
	}

}
