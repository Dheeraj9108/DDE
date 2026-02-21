package com.dde.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class FlowTemplateDTO {
	private UUID projectId;
	private String name;
	private String description;
}
