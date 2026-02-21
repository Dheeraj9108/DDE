package com.dde.util;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.dde.dto.FlowListDTO;
import com.dde.dto.FlowMetadataDTO;
import com.dde.dto.FlowResponseDTO;
import com.dde.dto.ProjectListDTO;
import com.dde.dto.ProjectRequestDTO;
import com.dde.dto.SummaryDTO;
import com.dde.model.Flow;
import com.dde.model.Project;
import com.dde.model.TerminalNodeData;

@Mapper(componentModel = "spring")
public interface DtoModelMapper {

	List<FlowListDTO> toFlowDTOs(List<Flow> flows);

	FlowResponseDTO toFlowDTO(Flow flow);
	
	List<ProjectListDTO> toProjectDTOs(List<Project> projects);
	
	@Mapping(target = "flow", ignore = true)
	Project toProjectModel(ProjectRequestDTO project);
	
	FlowMetadataDTO toFlowMetadataDTO(Flow flow);
	
	SummaryDTO toSummaryDTO(TerminalNodeData terminalNodeData);
}
