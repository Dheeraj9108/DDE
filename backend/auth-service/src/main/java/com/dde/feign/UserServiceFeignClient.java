package com.dde.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.dde.dto.SignupRequestDTO;
import com.dde.model.User;

//@FeignClient(name = "user-service")
@FeignClient(name = "user-service", url = "http://localhost:8083")
public interface UserServiceFeignClient {

	@GetMapping("/users/{username}")
	User getUserByUsername(@PathVariable("username") String username);
	
	@PostMapping("/users/")
	void createUser(@RequestBody SignupRequestDTO signupRequestDTO);

}
