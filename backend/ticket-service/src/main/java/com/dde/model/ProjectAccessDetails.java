package com.dde.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class ProjectAccessDetails extends TicketDetails{
	private String id;
	private String name;
}
