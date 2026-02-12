package com.dde.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.GenericJacksonJsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.JacksonJsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.dde.dto.Edge;
import com.dde.dto.FlowMetadata;
import com.dde.dto.Node;
import com.dde.model.Session;

@Configuration
public class RedisConfig {

	@Bean
	RedisTemplate<String, Node> nodeRedisTemplate(RedisConnectionFactory factory) {
		RedisTemplate<String, Node> template = new RedisTemplate<>();
		template.setConnectionFactory(factory);

		template.setKeySerializer(new StringRedisSerializer());
		template.setHashKeySerializer(new StringRedisSerializer());
		
		template.setValueSerializer(RedisSerializer.json());
		template.setHashValueSerializer(RedisSerializer.json());
		return template;
	}
	
	@Bean
	RedisTemplate<String, List<Edge>> edgeRedisTemplate(RedisConnectionFactory factory) {
		RedisTemplate<String, List<Edge>> template = new RedisTemplate<>();
		template.setConnectionFactory(factory);

		template.setKeySerializer(new StringRedisSerializer());

		template.setValueSerializer(RedisSerializer.json());
		return template;
	}
	
	@Bean
	RedisTemplate<String, FlowMetadata> metaDataRedisTemplate(RedisConnectionFactory factory) {
		RedisTemplate<String, FlowMetadata> template = new RedisTemplate<>();
		template.setConnectionFactory(factory);

		template.setKeySerializer(new StringRedisSerializer());

		template.setValueSerializer(RedisSerializer.json());
		return template;
	}
	
	@Bean
	RedisTemplate<String, Session> sessionRedisTemplate(RedisConnectionFactory factory) {
		RedisTemplate<String, Session> template = new RedisTemplate<>();
		template.setConnectionFactory(factory);

		template.setKeySerializer(new StringRedisSerializer());
		
		template.setValueSerializer(RedisSerializer.json());
		return template;
	}
}
