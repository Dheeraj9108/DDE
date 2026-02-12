package com.dde.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dde.dto.QuestionDTO;
import com.dde.dto.StartDiagnosisDTO;
import com.dde.dto.StartDiagnosisRequestDTO;
import com.dde.dto.SummaryDTO;
import com.dde.dto.UserResponseDTO;
import com.dde.service.IDiagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/diag")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DiagController {
	
	private final IDiagService diagService;
	
	@PostMapping("/startDiagnosis")
	public ResponseEntity<StartDiagnosisDTO> startDiagnosis(
			@RequestBody StartDiagnosisRequestDTO startDiagnosisRequestDTO) {
		return new ResponseEntity<>(diagService.startDiagnosis(startDiagnosisRequestDTO), HttpStatus.OK);
	}

	@PostMapping("/nextQuestion")
	public ResponseEntity<QuestionDTO> getNextQuestion(@RequestBody UserResponseDTO userResponse) {
		return new ResponseEntity<>(diagService.nextQuestion(userResponse), HttpStatus.OK);
	}

	@GetMapping("/summary/{sessionId}")
	public ResponseEntity<SummaryDTO> getSummary(@PathVariable("sessionId")UUID sessionId){
		return new ResponseEntity<>(diagService.getSummary(sessionId),HttpStatus.OK);
	}
}
