package com.dde.service;

import org.springframework.stereotype.Service;

import com.dde.model.AIResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AIService {

	private final GeminiService geminiService;
	
	public AIResponse generateExplaination() {
		String prompt = createPromptForQuestionExplaination();
		String response = geminiService.getResponse(prompt);
		log.info("Response From AI",response);
		return processAiResponse(response);
	}
	
	public AIResponse processAiResponse(String aiResponse) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode rootNode = mapper.readTree(aiResponse);
			JsonNode textNode = rootNode.get("candidates")
					.get(0)
					.path("content")
					.path("parts")
					.get(0)
					.path("text");
			return mapper.readValue(textNode.asText(), AIResponse.class);
		} catch (Exception e) {
			e.getStackTrace();
		}
		return null;
	}
	
	private String createPromptForQuestionExplaination() {
		return String.format("""
				You are an expert diagnostic assistant.

				You are explaining a step in a predefined diagnostic flow created by experts.

				Your role is to help the technician understand the purpose of the step.

				Rules:
				- Explain ONLY the provided step.
				- Do NOT suggest additional troubleshooting steps.
				- Do NOT modify the diagnostic flow.
				- Keep explanations short and practical.

				If the step type is QUESTION:
				Explain why the question is asked and what the technician should observe.

				If the step type is ACTION:
				Explain why the action is required and briefly how to perform it.

				Return the response strictly in JSON format.

				JSON format:
				
				{
				  "purpose": "short explanation of why the step exists",
				  "guidance": "what to observe or how to perform the step",
				  "commonMistakes": ["mistake1", "mistake2"]
				}

				Context:
				Flow Name: %s
				Step Type: %s
				Step: %s
				""","Drone Takeoff Failure","QUESTION","Are the propellers spinnig?");
//		return String.format("""
//					You are a diagnostic assistant.
//					Flow: %s
//					Question: %s
//					Explain why this question is asked during troubleshooting,
//					Explain	what the user should observe.
//					keep the explanation sjort and practicl.
//					Do not assume specific answer choices.
//				""", , );
	}
	
}