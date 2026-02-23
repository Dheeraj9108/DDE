package com.dde;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class IAMServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(IAMServiceApplication.class, args);
	}

}
