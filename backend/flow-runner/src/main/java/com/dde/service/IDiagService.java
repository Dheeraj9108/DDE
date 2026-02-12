package com.dde.service;

import java.util.UUID;

import com.dde.dto.QuestionDTO;
import com.dde.dto.StartDiagnosisDTO;
import com.dde.dto.StartDiagnosisRequestDTO;
import com.dde.dto.SummaryDTO;
import com.dde.dto.UserResponseDTO;

public interface IDiagService {
	StartDiagnosisDTO startDiagnosis(StartDiagnosisRequestDTO diagnosisRequestDTO);

	QuestionDTO nextQuestion(UserResponseDTO userResponse);

	SummaryDTO getSummary(UUID sessionID);
}
