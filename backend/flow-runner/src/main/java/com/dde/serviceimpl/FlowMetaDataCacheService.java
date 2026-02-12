package com.dde.serviceimpl;

import java.util.UUID;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.dde.constant.Constants;
import com.dde.dto.Flow;
import com.dde.dto.FlowMetadata;
import com.dde.feign.FlowServiceFeignClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FlowMetaDataCacheService {

	private final RedisTemplate<String, FlowMetadata> metaDataRedisTemplate;
	
	private final NodeCacheService nodeCache;
	
	private final EdgeCacheService edgeCache;
	
	private final FlowServiceFeignClient feignClient;

	private Flow loadFlow(UUID id) {
		return feignClient.getFlowById(id);
	}

	public FlowMetadata getFlowMetaData(UUID id) {

		String key = Constants.FLOW_KEY + id;

		FlowMetadata flowMetaData = metaDataRedisTemplate.opsForValue().get(key);

		if (flowMetaData != null)
			return flowMetaData;

		Flow flow = loadFlow(id);
		FlowMetadata metaData = new FlowMetadata();
		
		metaData.setId(flow.getId());
		metaData.setDescription(flow.getDescription());
		metaData.setName(flow.getName());
		
		metaDataRedisTemplate.opsForValue().set(key, metaData);
		nodeCache.cacheNodes(metaData.getId(), flow.getNodes());
		edgeCache.cacheEdges(metaData.getId(), flow.getEdges());
		
		return metaData;
	}
	
}
