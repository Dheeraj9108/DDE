package com.dde.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dde.model.AIResponse;
import com.dde.service.AIService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
class AIController {
	
	private final AIService aiService;
	
	@GetMapping("/explain")
	public ResponseEntity<AIResponse> generateQuestionExplaination(){
		return ResponseEntity.ok().body(aiService.generateExplaination());
	}
	
	@GetMapping
	public ResponseEntity<String> generateSummary() {
		return ResponseEntity.ok(null);
	}
}
