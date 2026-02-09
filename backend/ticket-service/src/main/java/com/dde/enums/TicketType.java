package com.dde.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TicketType {
	
	PROJECT_ACCESS_REQUEST("Project Access Request"),
	PERMISSION_REQUEST("Permission Request"),
	FLOW_REVIEW_REQUEST("Flow Review Request"),
	ISSUE_REPORT("Issue Report");
	
	private String value;
	
	TicketType(String value){
		this.value = value;
	}
	
	@JsonValue
	public String getValue() {
		return this.value;
	}
}
