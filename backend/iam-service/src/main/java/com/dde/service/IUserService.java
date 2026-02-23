package com.dde.service;

import com.dde.dto.UserDTO;
import com.dde.model.User;

public interface IUserService {
	
	UserDTO getUserByUsername(String username);
	
	UserDTO getUserProfile(String userContextObj);
	
	void createUser(UserDTO user);
}
