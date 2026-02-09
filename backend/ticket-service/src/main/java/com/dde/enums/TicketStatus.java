package com.dde.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TicketStatus {
	
	NEW("New"),
	HOLD("Hold"),
	IN_PROGRESS("In Progress"),
	COMPLETED("Completed"),
	REJECTED("Rejected");
	
	private String value;
	
	TicketStatus(String value){
		this.value = value;
	}
	
	@JsonValue
	public String getValue() {
		return this.value;
	}
}
