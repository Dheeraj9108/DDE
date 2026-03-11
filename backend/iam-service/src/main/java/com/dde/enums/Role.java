package com.dde.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
	ADMIN ("Admin"),
	FLOW_CREATOR ("Flow Creator"),
	FLOW_EXECUTOR ("Flow Executor");
	
	private final String value;
	
	Role(String role){
		this.value = role;
	}
	
	@JsonValue
	public String getValue() {
		return value;
	}
}
