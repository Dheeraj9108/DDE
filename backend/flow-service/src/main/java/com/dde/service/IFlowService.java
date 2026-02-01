package com.dde.service;

import java.util.List;
import java.util.UUID;

import com.dde.dto.FlowRequestDTO;
import com.dde.dto.FlowResponseDTO;
import com.dde.dto.CursorPageResponseDTO;
import com.dde.dto.FlowListDTO;
import com.dde.dto.FlowMetadataDTO;
import com.dde.dto.FlowTemplateDTO;
import com.dde.dto.QuestionDTO;
import com.dde.dto.StartDiagnosisDTO;
import com.dde.dto.StartDiagnosisRequestDTO;
import com.dde.dto.SummaryDTO;
import com.dde.dto.UserResponseDTO;

public interface IFlowService {
		
	public List<FlowListDTO> getFlows(UUID projectId);
	
	public UUID createFlowTemplate(FlowTemplateDTO flow);
	
	public void deleteFlowTemplate(UUID id);
	
	public FlowResponseDTO getFlowById(UUID id);
	
	void updateFlow(FlowRequestDTO flowDTO);
	
	CursorPageResponseDTO getFlowsforPagination(String cursor,int limit);
	
	FlowMetadataDTO getFlowMetadata(UUID id);
	
	StartDiagnosisDTO startDiagnosis(StartDiagnosisRequestDTO diagnosisRequestDTO);
	
	QuestionDTO nextQuestion(UserResponseDTO userResponse);
	
	SummaryDTO getSummary(UUID sessionID);
}
