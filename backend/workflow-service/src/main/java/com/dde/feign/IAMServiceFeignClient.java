package com.dde.feign;

import java.util.List;
import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.dde.dto.UserDTO;

@FeignClient(name = "iam-service")
//@FeignClient(name = "user-service", url = "http://localhost:8083")
public interface IAMServiceFeignClient {

	@GetMapping("/groups/getAllUsers/{groupId}")
	List<UserDTO> getUserByGroupId(@PathVariable("groupId") UUID id);
	
}
