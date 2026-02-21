package com.dde.model;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class InternalNodeData extends NodeData{
	private String content;
	private String actionType;
	private List<Option> options;
	private List<Range> ranges;
	
	@Data
	public static class Option{
		private String label;
		private String value;
		private List<String> evidence;
	}
	
	@Data
	public static class Range{
		private String label;
		private String rop1;
		private String rop1Value;
		private String lop;
		private String rop2;
		private String rop2Value;
	}
}
