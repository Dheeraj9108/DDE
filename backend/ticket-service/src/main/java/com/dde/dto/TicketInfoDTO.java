package com.dde.dto;

import java.util.List;
import java.util.UUID;

import com.dde.enums.Priority;
import com.dde.enums.TicketStatus;
import com.dde.enums.TicketType;
import com.dde.model.Comment;
import com.dde.model.TicketDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketInfoDTO {
	private UUID id;
	private TicketType type;
	private TicketStatus status;
	private Priority priority;
	private String title;
	private String description;
	private User createdBy;
	private User assignedTo;
	private TicketDetails details;
	private UUID groupId;
	private List<Comment> comments;
}
