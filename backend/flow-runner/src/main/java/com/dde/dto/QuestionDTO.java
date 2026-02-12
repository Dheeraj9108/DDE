package com.dde.dto;

import java.util.List;
import java.util.UUID;

import com.dde.enums.InputType;

import lombok.Data;

@Data
public class QuestionDTO {
	private UUID sessionId;
	private String nodeId;
	private UUID flowId;
	private String content;
	private InputType inputType;
	private List<String> options;
	private boolean isEnd;
}
