package com.dde.service;

import java.util.UUID;

import com.dde.dto.GroupDTO;
import com.dde.dto.JoinGroup;

public interface IGroupService {
	
	GroupDTO createGroup(GroupDTO groupDTO);
	
	GroupDTO getById(UUID id);
	
	GroupDTO joinGroup(JoinGroup joinGrouDTO, String userName);
}
