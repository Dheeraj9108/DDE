package com.dde.service;

import java.util.List;
import java.util.UUID;

import com.dde.dto.TicketInfoDTO;
import com.dde.dto.TicketListDTO;

public interface ITicketService {
	
	List<TicketListDTO> getAllTickets(UUID userId);
	
	void createTicket(TicketInfoDTO ticket);
	
	TicketInfoDTO getTicketById(UUID id);
}
