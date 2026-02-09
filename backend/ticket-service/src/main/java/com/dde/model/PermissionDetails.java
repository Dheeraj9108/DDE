package com.dde.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class PermissionDetails extends TicketDetails{
	private String roleId;
}
