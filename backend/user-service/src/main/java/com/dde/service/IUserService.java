package com.dde.service;

import com.dde.dto.UserDTO;
import com.dde.model.User;

public interface IUserService {
	
	User getUserByUsername(String username);
	
	void createUser(UserDTO user);
}
