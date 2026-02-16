package com.dde.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.dde.config.RabbitMQConfig;
import com.dde.dto.NotificationEvent;

@Service
public class NotificationListener {

//	@RabbitListener(queues = RabbitMQConfig.QUEUE)
	public void handleEvents(NotificationEvent event) {
		System.out.print("Notification Received");
	}
	
}
//hgaj jnoe isuf kgrx