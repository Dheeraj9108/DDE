package com.dde.dto;

import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class FlowResponseDTO {
		
	private UUID id;
	private List<NodeDTO> nodes;
	private List<EdgeDTO> edges;
	
}
