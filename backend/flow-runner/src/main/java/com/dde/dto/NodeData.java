package com.dde.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.Data;


@JsonTypeInfo(
	    use = JsonTypeInfo.Id.NAME,
	    include = JsonTypeInfo.As.PROPERTY,
	    property = "nodeType"
	)
	@JsonSubTypes({
	    @JsonSubTypes.Type(value = InternalNodeData.class, name = "INTERNAL"),
	    @JsonSubTypes.Type(value = TerminalNodeData.class, name = "TERMINAL")
	})
@Data
public abstract class NodeData {
	private String label;
	private List<String> comments;
}
