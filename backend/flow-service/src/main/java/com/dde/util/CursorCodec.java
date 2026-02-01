package com.dde.util;

import java.io.IOException;
import java.util.Base64;

import org.springframework.stereotype.Component;

import com.dde.dto.FlowCursor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Component
public class CursorCodec {

	private final ObjectMapper objectMapper = JsonMapper.builder().addModule(new JavaTimeModule()).build();

	public String encode(FlowCursor cursor){
		try {
			byte[] jsonBytes = objectMapper.writeValueAsBytes(cursor);
	        return Base64.getUrlEncoder()
	                     .withoutPadding()
	                     .encodeToString(jsonBytes);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return null;
		}
	}

	public FlowCursor decode(String encoded) {
		byte[] decoded = Base64.getUrlDecoder().decode(encoded);
		try {
			return objectMapper.readValue(decoded, FlowCursor.class);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

}
