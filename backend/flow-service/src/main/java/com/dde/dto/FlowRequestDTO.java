package com.dde.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class FlowRequestDTO {
	private UUID id;
	private NodesWrapper nodes;
	private EdgesWrapper edges;
}
