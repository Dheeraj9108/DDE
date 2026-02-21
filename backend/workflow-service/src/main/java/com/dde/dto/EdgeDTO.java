package com.dde.dto;

import java.util.UUID;

import com.dde.model.EdgeData;
import com.dde.model.EdgeStyle;

import lombok.Data;

@Data
public class EdgeDTO {
	
	private UUID edgeId;
	private String id;
	private String source;
	private String target;
	private EdgeStyle style;
	private EdgeData data;
}
