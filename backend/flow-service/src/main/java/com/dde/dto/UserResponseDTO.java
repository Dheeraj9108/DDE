package com.dde.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class UserResponseDTO {
	private UUID sessionId;
	private String nodeId;
	private String prompt;
	private String answer;
}
