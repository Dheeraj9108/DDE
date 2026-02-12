package com.dde.serviceimpl;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.dde.constant.Constants;
import com.dde.dto.Node;

import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class NodeCacheService {

	private final RedisTemplate<String, Node> nodeRedisTemplate;
	
	private final ObjectMapper mapper;
	
	public void cacheNodes(UUID flowId, List<Node> nodes) {
		for (Node node : nodes) {
			String key = Constants.FLOW_KEY + flowId + Constants.NODE_KEY;
			nodeRedisTemplate.opsForHash().put(key, node.getId(), node);
		}
	}

	public Node getNode(UUID flowId, String id) {
		String key = Constants.FLOW_KEY + flowId + Constants.NODE_KEY;
		Object obj = nodeRedisTemplate.opsForHash().get(key, id);
		if(obj == null) return null;
		return mapper.convertValue(obj, Node.class);
	}
	
	public List<Node> getAllNodes(UUID flowId) {
		String key = Constants.FLOW_KEY + flowId + Constants.NODE_KEY;
		Map<Object, Object> map = nodeRedisTemplate.opsForHash().entries(key);
		return map.values().stream().map(obj -> mapper.convertValue(obj,Node.class)).toList();
	}
}
