package com.dde.dto;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class TerminalNodeData extends NodeData{
	private String issue;
	private String summary;
	private String status;
	private Integer confidence;
	private List<String> recommendedSteps;
}
