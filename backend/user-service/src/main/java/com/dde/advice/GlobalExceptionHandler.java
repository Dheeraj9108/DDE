package com.dde.advice;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.dde.dto.ErrorResponseDTO;
import com.dde.exception.UserNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponseDTO> handleUserNotFound(UserNotFoundException ex, WebRequest request){
		ErrorResponseDTO errorResponseDTO = ErrorResponseDTO.builder()
											.timestamp(LocalDateTime.now())
											.status(HttpStatus.NOT_FOUND.value())
											.error(HttpStatus.NOT_FOUND.getReasonPhrase())
											.message(ex.getMessage())
											.path(request.getDescription(false).replace("uri=", ""))
											.build(); 
		return new ResponseEntity<ErrorResponseDTO>(errorResponseDTO,HttpStatus.NOT_FOUND);
	}
	
}
