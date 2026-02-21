package com.dde.dto;

import java.util.UUID;

import com.dde.model.NodeData;

import lombok.Data;

@Data
public class NodeDTO {
	
	private UUID nodeId;
	private String id;
	private String type;
	private NodeData data;
}
