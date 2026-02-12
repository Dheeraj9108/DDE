package com.dde.serviceimpl;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.dde.constant.Constants;
import com.dde.dto.Edge;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EdgeCacheService {

	private final RedisTemplate<String, List<Edge>> edgeRedisTemplate;
	
	public void cacheEdges(UUID flowId, List<Edge> edges) {
		Map<String, List<Edge>> edgeMap = edges.stream().collect(Collectors.groupingBy(Edge::getSource));

		edgeMap.forEach((source, edgeList) -> {
			String key = Constants.FLOW_KEY + flowId + Constants.EDGE_KEY + source;
			edgeRedisTemplate.opsForValue().set(key, edgeList);
		});
	}
	
	public List<Edge> getEdges(UUID flowId, String sourceNodeId) {
		String key = Constants.FLOW_KEY + flowId + Constants.EDGE_KEY + sourceNodeId;
		return edgeRedisTemplate.opsForValue().get(key);
	}
		
}
