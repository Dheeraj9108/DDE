package com.dde.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class SummaryDTO {
	private String issue;
	private Integer confidence;
	private String summary;
	private String status;
	private List<String> recommendedSteps;
	private List<String> evidences;
	private String flowName;
	private LocalDateTime completedTime;
	private List<Conversation> coversations;
}
