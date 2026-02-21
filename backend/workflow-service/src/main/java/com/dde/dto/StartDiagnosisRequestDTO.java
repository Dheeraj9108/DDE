package com.dde.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class StartDiagnosisRequestDTO {
	private UUID flowId;
	private String userId;
}
