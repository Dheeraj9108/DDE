package com.dde.model;

import com.dde.enums.Role;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class PermissionDetails extends TicketDetails{
	private Role role;
}
