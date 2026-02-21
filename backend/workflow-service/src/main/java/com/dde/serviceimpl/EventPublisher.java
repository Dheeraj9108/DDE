package com.dde.serviceimpl;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.dde.config.RabbitMQConfig;
import com.dde.dto.NotificationEvent;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventPublisher {
	
	private final RabbitTemplate rabbitTemplate;
	
	public void publishEvent(NotificationEvent event) {
		rabbitTemplate.convertAndSend(
				RabbitMQConfig.EXCHANGE,
				RabbitMQConfig.ROUTING_KEY, event
		);
	}

}
