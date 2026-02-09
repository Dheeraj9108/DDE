package com.dde.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "type"
		)
@JsonSubTypes({
	@JsonSubTypes.Type(value = ProjectAccessDetails.class, name = "Project Access Request"),
	@JsonSubTypes.Type(value = FlowReviewDetails.class, name = "Flow Review Request "),
	@JsonSubTypes.Type(value = PermissionDetails.class, name = "Permission Request"),
	@JsonSubTypes.Type(value = IssueReportDetails.class, name = "Issue Report")
})
public abstract class TicketDetails {

}
