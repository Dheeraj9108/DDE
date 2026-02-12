package com.dde.serviceimpl;

import java.util.UUID;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.dde.constant.Constants;
import com.dde.model.Session;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SessionCacheService {
	
	private final RedisTemplate<String, Session> sessionRedisTemplate;
	
	public void saveSession(Session session) {
		String key = Constants.SESSION_KEY + session.getId();
		sessionRedisTemplate.opsForValue().set(key, session);
	}

	public Session getSession(UUID id) {
		String key = Constants.SESSION_KEY + id;
		return sessionRedisTemplate.opsForValue().get(key);
	}

	public void deleteSession(UUID id) {
		String key = Constants.SESSION_KEY + id;
		sessionRedisTemplate.delete(key);
	}
	
}
