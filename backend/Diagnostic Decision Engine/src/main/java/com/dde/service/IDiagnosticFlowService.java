package com.dde.service;

import java.util.List;

import com.dde.dto.DiagnosticFlowDTO;
import com.dde.models.DiagnosticFlow;
import com.dde.models.FlowNode;

public interface IDiagnosticFlowService {
		
	public List<DiagnosticFlow> getDiagnosticFlowList();
	
	public DiagnosticFlow getDiagnosticFlowById(Integer id);
	
	public DiagnosticFlow createFlow(DiagnosticFlowDTO dto);
	
	public FlowNode createNode(FlowNode node);
	
	public FlowNode getNodeById(Integer id);
	
}
