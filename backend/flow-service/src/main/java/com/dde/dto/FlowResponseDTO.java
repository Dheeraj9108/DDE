package com.dde.dto;

import java.util.List;
import java.util.UUID;

import com.dde.enums.FlowStatus;

import lombok.Data;

@Data
public class FlowResponseDTO {
		
	private UUID id;
	private FlowStatus status;
	private List<NodeDTO> nodes;
	private List<EdgeDTO> edges;
	
}
