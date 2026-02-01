package com.dde.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class StartDiagnosisDTO {
	
	private UUID sessionId;
	private FlowMetadataDTO flowMetadata;  
	private QuestionDTO question;
}
