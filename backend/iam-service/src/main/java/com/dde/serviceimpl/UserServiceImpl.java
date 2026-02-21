package com.dde.serviceimpl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dde.dto.GroupDTO;
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
	public UserDTO getUserByUsername(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(()->new UserNotFoundException(username));
		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setUsername(user.getUsername());
		userDTO.setGroups(getGroups(user));
		userDTO.setPassword(user.getPassword());
		return userDTO;
	}
	
	private List<GroupDTO> getGroups(User user){
		return user.getGroups().stream().map((group)->{
			GroupDTO groupDTO = new GroupDTO();
			groupDTO.setId(group.getId());
			groupDTO.setName(group.getName());
			return groupDTO;
		}).collect(Collectors.toList());
	}
	
	@Override
	public void createUser(UserDTO userDto) {
		User user = new User();
		user.setUsername(userDto.getUsername());
		user.setPassword(userDto.getPassword());
		userRepository.save(user);
	}

}
