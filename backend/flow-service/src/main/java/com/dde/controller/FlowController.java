package com.dde.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
import com.dde.service.IFlowService;

@RestController
@RequestMapping("/flows")
@CrossOrigin(origins = "*")
public class FlowController {

	@Autowired
	private IFlowService flowService;

	@GetMapping
	public ResponseEntity<List<FlowListDTO>> getAllFlows(@RequestParam("projectId") UUID projectId) {
		return new ResponseEntity<>(flowService.getFlows(projectId), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<UUID> createFlow(@RequestBody FlowTemplateDTO flowDto) {
		return new ResponseEntity<>(flowService.createFlowTemplate(flowDto), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteFlowTemplate(@PathVariable("id") UUID id) {
		flowService.deleteFlowTemplate(id);
		return new ResponseEntity<>("Flow Deleted Successfully", HttpStatus.OK);
	}

	@PatchMapping
	public ResponseEntity<String> updateFlow(@RequestBody FlowRequestDTO flowDto) {
		flowService.updateFlow(flowDto);
		return new ResponseEntity<>("Flow Updated Successfully", HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<FlowResponseDTO> getFlowById(@PathVariable("id") UUID id) {
		return new ResponseEntity<>(flowService.getFlowById(id), HttpStatus.OK);
	}

	@GetMapping("/paginated")
	public ResponseEntity<CursorPageResponseDTO> getFlowsforPagination(@RequestParam(required = false) String cursor,
			@RequestParam(defaultValue = "20") int limit) {
		return new ResponseEntity<>(flowService.getFlowsforPagination(cursor, limit), HttpStatus.OK);
	}

	@GetMapping("/metadata/{id}")
	public ResponseEntity<FlowMetadataDTO> getFlowMetadata(@PathVariable("id") UUID id) {
		return new ResponseEntity<>(flowService.getFlowMetadata(id), HttpStatus.OK);
	}

	@PostMapping("/startDiagnosis")
	public ResponseEntity<StartDiagnosisDTO> startDiagnosis(
			@RequestBody StartDiagnosisRequestDTO startDiagnosisRequestDTO) {
		return new ResponseEntity<>(flowService.startDiagnosis(startDiagnosisRequestDTO), HttpStatus.OK);
	}

	@PostMapping("/nextQuestion")
	public ResponseEntity<QuestionDTO> getNextQuestion(@RequestBody UserResponseDTO userResponse) {
		return new ResponseEntity<>(flowService.nextQuestion(userResponse), HttpStatus.OK);
	}

	@GetMapping("/summary/{sessionId}")
	public ResponseEntity<SummaryDTO> getSummary(@PathVariable("sessionId")UUID sessionId){
		return new ResponseEntity<>(flowService.getSummary(sessionId),HttpStatus.OK);
	}
}
