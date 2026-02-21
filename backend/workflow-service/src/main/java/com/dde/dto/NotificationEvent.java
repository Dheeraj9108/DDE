package com.dde.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class NotificationEvent {
	private UUID id;
	private String email;
}
