package com.dde.serviceimpl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dde.dto.GroupDTO;
import com.dde.dto.UserContextDTO;
import com.dde.dto.UserDTO;
import com.dde.exception.UserNotFoundException;
import com.dde.model.User;
import com.dde.model.UserGroup;
import com.dde.repository.UserGroupRepository;
import com.dde.repository.UserRepository;
import com.dde.service.IUserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

	private final UserRepository userRepository;
	
	private final UserGroupRepository userGroupRepository;

	@Override
	public UserDTO getUserByUsername(String username) {
		UserDTO userDTO = new UserDTO();
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException(username));
		userDTO.setId(user.getId());
		userDTO.setUsername(user.getUsername());
		userDTO.setPassword(user.getPassword());
		userDTO.setGroups(getGroups(user));
		return userDTO;
	}

	@Override
	public UserDTO getUserProfile(String userContextObj, UUID groupId) {
		UserDTO userDTO = new UserDTO();
		try {
			UserContextDTO userContext = new ObjectMapper().readValue(userContextObj, UserContextDTO.class);
			User user = userRepository.findByUsername(userContext.getUsername())
					.orElseThrow(() -> new UserNotFoundException(userContext.getUsername()));
			UserGroup ug = userGroupRepository.findByUserIdAndGroupId(userContext.getId(), groupId);
			
			userDTO.setId(user.getId());
			userDTO.setUsername(user.getUsername());
			userDTO.setPassword(user.getPassword());
			userDTO.setGroups(getGroups(user));
			userDTO.setProjectOwner(ug.isProjectOwner());
			userDTO.setRoles(ug.getRoles());
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return userDTO;
	}

	private List<GroupDTO> getGroups(User user) {
		return user.getGroups().stream().map((group) -> {
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

	@Override
	public List<UserDTO> getUsersInBatch(List<UUID> ids){
		List<User> users = userRepository.findAllById(ids);
		return users.stream().map(user->{
			UserDTO userDTO = new UserDTO();
			userDTO.setId(user.getId());
			userDTO.setUsername(user.getUsername());
			userDTO.setEmail("dhe@gmail.com");
			return userDTO;
		}).collect(Collectors.toList());
	}
}
