package com.dde.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dde.dto.TicketListDTO;
import com.dde.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, UUID>{
	@Query(value = 
			"SELECT t.id AS id,"
			+ "t.status AS status ,"
			+ "t.priority AS priority,"
			+ "t.type AS type,"
			+ "t.title AS title,"
			+ "t.updated_at AS updatedAt,"
			+ "u1.username AS createdBy,"
			+ "u2.username As assignedTo "
			+ "FROM TICKET t JOIN DDE_USERS u1 ON t.created_by = u1.id "
			+ "JOIN DDE_USERS u2 ON t.assigned_to = u2.id "
			+ "WHERE t.created_by = :id OR t.assigned_to = :id", 
	nativeQuery = true)
	List<TicketListDTO> findByUserId(@Param("id")UUID id);
}
