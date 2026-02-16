package com.dde.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dde.service.EmailService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class NotificationController {
	
	private final EmailService emailService;
	
	@PostMapping("/sendEmail")
	public String sendEmail() {
		emailService.sendEmail();
		return "success";
	}
	
	@PostMapping("/sendEmailWithHtml")
	public String sendEmailWithHtml() {
		try {
			emailService.sendEmailWithHtml();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "success";
	}
}
