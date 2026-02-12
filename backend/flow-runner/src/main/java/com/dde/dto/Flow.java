package com.dde.dto;

import java.util.List;
import java.util.UUID;
import lombok.Data;

@Data
public class Flow {
	
	private UUID id;
	private String name;
	private String description;
	private String status;
	private List<Node> nodes;
	private List<Edge> edges;
}
