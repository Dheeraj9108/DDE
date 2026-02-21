package com.dde.dto;

import java.util.List;

import lombok.Data;

@Data
public class EdgesWrapper {
	List<EdgeDTO> upserts;
	List<EdgeDTO> deletes;
}
