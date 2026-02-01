package com.dde.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.dde.dto.DiagnosticFlowDTO;
import com.dde.models.DiagnosticFlow;
import com.dde.models.FlowNode;

public interface IDiagnosticFlowController {
	
	public ResponseEntity<List<DiagnosticFlow>> getDiagnosticFlows();
	
	public ResponseEntity<DiagnosticFlow> getDiagnosticFlowById(Integer id);
	
	public ResponseEntity<DiagnosticFlow> createFlow(DiagnosticFlowDTO dto);
	
	public ResponseEntity<FlowNode> createNode(FlowNode node);
	
	public ResponseEntity<FlowNode> getNodeById(Integer id);
}
