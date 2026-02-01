package com.dde.serviceimpl;

import org.springframework.stereotype.Service;

import com.dde.dto.UserDTO;
import com.dde.exception.UserNotFoundException;
import com.dde.model.User;
import com.dde.repository.UserRepository;
import com.dde.service.IUserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService{
		
	private final UserRepository userRepository;
	
	@Override
	public User getUserByUsername(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(()->new UserNotFoundException(username));
		return user;
	}
	
	@Override
	public void createUser(UserDTO userDto) {
		User user = new User();
		user.setUsername(userDto.getUsername());
		user.setPassword(userDto.getPassword());
		userRepository.save(user);
	}

}
