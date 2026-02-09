package com.dde.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class IssueReportDetails extends TicketDetails{
	private String sessionId;
}
