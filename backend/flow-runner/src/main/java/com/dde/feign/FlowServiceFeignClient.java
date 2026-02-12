package com.dde.feign;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.dde.dto.Flow;

@FeignClient(name="flow-service", url="http://localhost:8085")
public interface FlowServiceFeignClient {

	@GetMapping("/flows/{id}")
	Flow getFlowById(@PathVariable("id") UUID id);
}
