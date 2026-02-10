package com.dde.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {

	ADMIN ("Admin"),
	FLOW_CREATOR("Flow Creator"),
	FLOW_EXECUTOR("Flow Executor");
	
	private String value;
	
	Role(String value){
		this.value = value;
	}
	
	@JsonValue
	public String getValue() {
		return this.value;
	}
	
}
