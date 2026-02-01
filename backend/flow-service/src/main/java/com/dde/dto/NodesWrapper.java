package com.dde.dto;

import java.util.List;

import lombok.Data;

@Data
public class NodesWrapper {
	
	List<NodeDTO> upserts;
	List<NodeDTO> deletes;
}
