package com.dde.serviceimpl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dde.dto.TicketInfoDTO;
import com.dde.dto.TicketListDTO;
import com.dde.dto.User;
import com.dde.enums.TicketStatus;
import com.dde.enums.TicketType;
import com.dde.model.Ticket;
import com.dde.model.TicketDetails;
import com.dde.repository.TicketRepository;
import com.dde.service.ITicketService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements ITicketService{
	
	private final TicketRepository ticketRepo;
	
	@Override
	public List<TicketListDTO> getAllTickets(UUID userId) {
		return ticketRepo.findByUserId(userId);
	}

	@Override
	public void createTicket(TicketInfoDTO ticketDto) {
		// TODO Auto-generated method stub
		Ticket ticket = new Ticket();
		ticket.setStatus(TicketStatus.NEW);
		ticket.setCreatedBy(ticketDto.getCreatedBy().getId());
		ticket.setAssignedTo(ticketDto.getAssignedTo().getId());
		ticket.setPriority(ticketDto.getPriority());
		ticket.setTitle(ticketDto.getTitle());
		ticket.setDescription(ticketDto.getDescription());
		ticket.setType(ticketDto.getType());
		ticket.setDetails(ticketDto.getDetails());
		ticketRepo.save(ticket);
	}
	
	@Override
	public TicketInfoDTO getTicketById(UUID id) {
		Ticket ticket = ticketRepo.findById(id).orElseThrow();
		return TicketInfoDTO
				.builder()
				.id(id)
				.title(ticket.getTitle())
				.description(ticket.getDescription())
				.assignedTo(new User(id,"Dheeraj"))
				.createdBy(new User(id,"John"))
				.details(getTicketDetails(ticket.getType(),ticket.getDetails()))
				.priority(ticket.getPriority())
				.status(ticket.getStatus())
				.type(ticket.getType())
				.comments(ticket.getComments())
				.build();
	}
	
	private TicketDetails getTicketDetails(TicketType type, TicketDetails details) {
		if(type == TicketType.PERMISSION_REQUEST) {
		}
		return details;
	}
	
	@Override
	public void deleteTicket(UUID id) {
		ticketRepo.deleteById(id);
	}
	
	@Override
	public void update(TicketInfoDTO ticketDto) {
		Ticket ticket = ticketRepo.findById(ticketDto.getId()).orElseThrow();
		ticket.setType(ticketDto.getType());
		ticket.setStatus(ticketDto.getStatus());
		ticket.setPriority(ticketDto.getPriority());
		ticket.setTitle(ticketDto.getTitle());
		ticket.setDescription(ticketDto.getDescription());
		ticket.setAssignedTo(ticketDto.getAssignedTo().getId());
		ticket.setDetails(ticketDto.getDetails());
		ticketRepo.save(ticket);
	}
}
