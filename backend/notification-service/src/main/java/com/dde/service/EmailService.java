package com.dde.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

	private final JavaMailSender mailSender;

	private final TemplateEngine templateEngine;

	public void sendEmail() {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("ninjaturtle9108@gmail.com");
		message.setTo("ninjaturtle9108@gmail.com");
		message.setSubject("Test Email");
		message.setText("Simple Test Email from GuideDx");
		mailSender.send(message);

	}

	public void sendEmailWithHtml() throws MessagingException {
		Context context = new Context();
		context.setVariable("bodyFragment", "fragments/account-created :: content");
		context.setVariable("name", "Dheeraj");
		String htmlContent = templateEngine.process("base-email", context);
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setTo("ninjaturtle9108@gmail.com");
		helper.setFrom("ninjaturtle9108@gmail.com");
		helper.setText(htmlContent, true);
		helper.setSubject("Test Email");
		mailSender.send(message);
	}
}
