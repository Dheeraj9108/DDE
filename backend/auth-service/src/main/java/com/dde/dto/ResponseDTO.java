package com.dde.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ResponseDTO<T> {
	
	private boolean success;
	private int status;
	private String message;
	private T data;
	private LocalDateTime timestamp;
	
}
