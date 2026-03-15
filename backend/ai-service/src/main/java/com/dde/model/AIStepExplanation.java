package com.dde.model;

import java.util.List;

import lombok.Data;

@Data
public class AIResponse {
	
	private String purpose;
	private String guidance;
	private List<String> commonMistakes;

}
