package com.dde.service;

import java.util.List;
import java.util.UUID;

import com.dde.dto.GroupDTO;
import com.dde.dto.JoinGroup;
import com.dde.dto.UserDTO;

public interface IGroupService {
	
	GroupDTO createGroup(GroupDTO groupDTO);
	
	GroupDTO getById(UUID id);
	
	GroupDTO joinGroup(JoinGroup joinGrouDTO, String userName);
	
	List<UserDTO> getMembersByGroupId(UUID id);
}
