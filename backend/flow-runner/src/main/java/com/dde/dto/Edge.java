package com.dde.dto;

import java.util.UUID;

//import com.dde.model.EdgeData;
//import com.dde.model.EdgeStyle;

import lombok.Data;

@Data
public class Edge {
	
	private UUID edgeId;
	private String id;
	private String source;
	private String target;
	private EdgeData data;
}
