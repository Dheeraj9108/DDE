package com.dde.serviceimpl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dde.dto.Edge;
import com.dde.dto.FlowMetadata;
import com.dde.dto.Node;
import com.dde.model.Session;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CacheFacadeService {

	private final FlowMetaDataCacheService flowMetaDataCache;
	
	private final NodeCacheService nodeCache;
	
	private final EdgeCacheService edgeCache;
	
	private final SessionCacheService sessionCache;
	
	public FlowMetadata getFlowMetaData(UUID id) {
		return flowMetaDataCache.getFlowMetaData(id);
	}
	
	public Node getNode(UUID flowId, String nodeId) {
		return nodeCache.getNode(flowId, nodeId);
	}
	
	public List<Node> getAllNodes(UUID flowId) {
		return nodeCache.getAllNodes(flowId);
	}
	
	public List<Edge> getEdges(UUID flowId, String sourceNodeId) {
		return edgeCache.getEdges(flowId, sourceNodeId);
	}
	
	public Session getSession(UUID id) {
		return sessionCache.getSession(id);
	}
	
	public void saveSession(Session session) {
		sessionCache.saveSession(session);
	}
	
	public void deleteSession(UUID id) {
		sessionCache.deleteSession(id);
	}
}
