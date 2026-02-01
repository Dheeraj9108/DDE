package com.dde.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dde.model.Edge;

public interface EdgeRepository extends JpaRepository<Edge,UUID>{
	List<Edge> findByFlowIdAndSource(UUID flowId, String source);
}
