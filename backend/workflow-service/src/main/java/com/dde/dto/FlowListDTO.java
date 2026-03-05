package com.dde.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.dde.enums.FlowStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class FlowListDTO {
	
	private UUID id;
	private Integer version;
	private String name;
	private String description;
	private FlowStatus status;
	private LocalDateTime createdAt;
	@JsonIgnore
	private UUID userId;
	private String createdBy;
}
