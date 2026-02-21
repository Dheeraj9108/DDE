package com.dde.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum FlowStatus {
	
	DRAFT("Draft"),
	SUBMITTED("Submitted"),
	UNDER_REVIEW("Under Review"),
	APPROVED("Approved"),
	REQUESTED_CHANGES("Requested Changes");
	
	private final String value;
	
	FlowStatus(String value){
		this.value = value;
	}
	
	@JsonValue
	public String getValue() {
		return this.value;
	}
}
