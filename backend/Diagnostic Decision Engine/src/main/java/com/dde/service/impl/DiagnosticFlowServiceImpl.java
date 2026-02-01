package com.dde.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dde.dto.DiagnosticFlowDTO;
import com.dde.models.DiagnosticFlow;
import com.dde.models.FlowNode;
import com.dde.repository.DiagnosticFlowRepository;
import com.dde.repository.FlowRepository;
import com.dde.service.IDiagnosticFlowService;

@Service
public class DiagnosticFlowServiceImpl implements IDiagnosticFlowService{
	
	@Autowired
	private DiagnosticFlowRepository repository;
	
	@Autowired 
	private FlowRepository nodeRepository;

	@Override
	public List<DiagnosticFlow> getDiagnosticFlowList() {
		List<DiagnosticFlow> diagFlows = repository.findAll();
		return diagFlows;
	}

	@Override
	public DiagnosticFlow getDiagnosticFlowById(Integer id) {
		DiagnosticFlow diagFlow = repository.findById(id).orElse(new DiagnosticFlow());
		return diagFlow;
	}

	@Override
	public DiagnosticFlow createFlow(DiagnosticFlowDTO dto) {
		DiagnosticFlow flow = new DiagnosticFlow();
		flow.setName(dto.getName());
		flow.setDescription(dto.getDescription());
		System.out.println(flow.getName());
		return repository.save(flow);
	}
	
	@Override
	public FlowNode createNode(FlowNode node) {
		return nodeRepository.save(node);
	}

	@Override
	public FlowNode getNodeById(Integer id) {
		return nodeRepository.findById(id).orElse(new FlowNode());
	}
}
