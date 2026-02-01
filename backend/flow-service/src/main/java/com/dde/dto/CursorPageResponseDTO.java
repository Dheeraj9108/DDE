package com.dde.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CursorPageResponseDTO {
	private String next;
	private List<FlowListDTO> flows;
}
