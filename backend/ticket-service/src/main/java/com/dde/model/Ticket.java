package com.dde.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import com.dde.enums.Priority;
import com.dde.enums.TicketStatus;
import com.dde.enums.TicketType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {

	@Id
	@GeneratedValue
	private UUID id;
	
	private String title;
	
	private String description;
	
	@Enumerated(EnumType.STRING)
	private Priority priority;
	
	private UUID createdBy;
	
	private UUID assignedTo;
	
	@Enumerated(EnumType.STRING)
	private TicketType type;
	
	@Column(nullable=false)
	private UUID groupId;
	
	@Enumerated(EnumType.STRING)
	private TicketStatus status;
	
	@JdbcTypeCode(SqlTypes.JSON)
	@Column(columnDefinition = "jsonb")
	private TicketDetails details;
	
	@OneToMany(mappedBy = "ticket", fetch = FetchType.LAZY, orphanRemoval = true)
	private List<Comment> comments;
	
	@CreationTimestamp
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	private LocalDateTime updatedAt;
}
