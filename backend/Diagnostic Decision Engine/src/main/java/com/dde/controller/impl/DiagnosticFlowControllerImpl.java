package com.dde.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dde.controller.IDiagnosticFlowController;
import com.dde.dto.DiagnosticFlowDTO;
import com.dde.models.DiagnosticFlow;
import com.dde.models.FlowNode;
import com.dde.service.IDiagnosticFlowService;

@RestController
@RequestMapping("/diagnosticFlowService")
public class DiagnosticFlowControllerImpl implements IDiagnosticFlowController{

	@Autowired
	private IDiagnosticFlowService service;
	
	@Override
	@GetMapping("/diagnosticFlows")
	public ResponseEntity<List<DiagnosticFlow>> getDiagnosticFlows() {
		return new ResponseEntity<>(service.getDiagnosticFlowList(),HttpStatus.OK);
	}

	@Override
	@GetMapping("/diagnosticFlows/{id}")
	public ResponseEntity<DiagnosticFlow> getDiagnosticFlowById(@PathVariable Integer id) {
		return new ResponseEntity<>(service.getDiagnosticFlowById(id),HttpStatus.OK);
	}

	@Override
	@PostMapping("createFlow")
	public ResponseEntity<DiagnosticFlow> createFlow(@RequestBody DiagnosticFlowDTO dto) {
		return new ResponseEntity<>(service.createFlow(dto),HttpStatus.CREATED);
	}
	

	@Override
	@PostMapping("createNode")
	public ResponseEntity<FlowNode> createNode(@RequestBody FlowNode node) {
		return new ResponseEntity<>(service.createNode(node),HttpStatus.CREATED);
	}
	
	@Override
	@GetMapping("/nodes/{id}")
	public ResponseEntity<FlowNode> getNodeById(@PathVariable("id") Integer id) {
		return new ResponseEntity<>(service.getNodeById(id),HttpStatus.OK);
	}
	
}
