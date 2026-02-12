package com.dde.enums;

public enum DiagnosisStatus {
	
	IN_PROGRESS("In Progress"),
	COMPLETED("Completed");
	
	private String value;
	
	DiagnosisStatus(String value) {
		this.value = value;
	}
	
	public String getValue() {
		return this.value;
	}
}
