package com.dde;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class FlowRunnerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlowRunnerApplication.class, args);
	}

}
