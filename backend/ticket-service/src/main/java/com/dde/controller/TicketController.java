package com.dde.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dde.dto.TicketInfoDTO;
import com.dde.dto.TicketListDTO;
import com.dde.service.ITicketService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TicketController {

	private final ITicketService ticketService;

	@GetMapping
	public ResponseEntity<List<TicketListDTO>> getAllTickets(@RequestParam("userId") UUID userId) {
		return new ResponseEntity<>(ticketService.getAllTickets(userId), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<String> createTicket(@RequestBody TicketInfoDTO ticketDto) {
		ticketService.createTicket(ticketDto);
		return new ResponseEntity<>("Ticket created successfully", HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<TicketInfoDTO> getTicketById(@PathVariable("id") UUID id) {
		return new ResponseEntity<TicketInfoDTO>(ticketService.getTicketById(id), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteTicket(@PathVariable("id") UUID id){
		ticketService.deleteTicket(id);
		return ResponseEntity.status(HttpStatus.OK).body("Ticket Deleted Successfully");
	}
	
	@PutMapping
	public ResponseEntity<String> updateTicket(@RequestBody TicketInfoDTO ticketDto){
		ticketService.update(ticketDto);
		return ResponseEntity.status(HttpStatus.OK).body("Ticket Updated Successfully");
	}
}
