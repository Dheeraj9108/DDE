package com.dde.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;


@JsonTypeInfo(
	    use = JsonTypeInfo.Id.NAME,
	    include = JsonTypeInfo.As.PROPERTY,
	    property = "nodeType"
	)
	@JsonSubTypes({
	    @JsonSubTypes.Type(value = InternalNodeData.class, name = "INTERNAL"),
	    @JsonSubTypes.Type(value = TerminalNodeData.class, name = "TERMINAL")
	})
public abstract class NodeData {
	
}
