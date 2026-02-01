package com.dde.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Data;

@Data
public class FlowListDTO {
	
	private UUID id;
	private String name;
	private String description;
	private LocalDateTime createdAt;
}
