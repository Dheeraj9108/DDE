package com.dde.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class FlowMetadata {
	
	private UUID id;	
	private String name;
	private String description;
}
