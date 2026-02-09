package com.dde.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class FlowReviewDetails extends TicketDetails{
	private String flowId;
}
