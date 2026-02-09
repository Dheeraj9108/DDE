package com.dde.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Priority {
	
	HIGH("High"),
	MEDIUM("Medium"),
	LOW("Low");
	
	private String value;
	
	Priority(String value){
		this.value = value;
	}
	
	@JsonValue
	public String getValue() {
		return this.value;
	}
	
}
