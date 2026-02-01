package com.dde.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dde.model.Node;

public interface NodeRepository extends JpaRepository<Node, UUID> {
	Node findByFlowIdAndType(UUID flowId, String type);
	Node findByFlowIdAndId(UUID flowId, String id);
}
