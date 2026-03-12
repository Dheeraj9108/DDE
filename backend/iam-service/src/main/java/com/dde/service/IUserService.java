package com.dde.service;

import java.util.List;
import java.util.UUID;

import com.dde.dto.UserDTO;

public interface IUserService {
	
	UserDTO getUserByUsername(String username);
	
	UserDTO getUserProfile(String userContextObj, UUID groupId);
	
	void createUser(UserDTO user);
	
	List<UserDTO> getUsersInBatch(List<UUID> ids);
}
