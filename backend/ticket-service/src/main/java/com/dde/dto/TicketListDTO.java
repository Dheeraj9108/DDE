package com.dde.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.dde.enums.Priority;
import com.dde.enums.TicketStatus;
import com.dde.enums.TicketType;

import lombok.Data;

public interface TicketListDTO {
	
	UUID getId();
	TicketStatus getStatus();
	Priority getPriority();
	TicketType getType();
	String getTitle();
	String getCreatedBy();
	LocalDateTime getUpdatedAt();
	String getAssignedTo();
}
