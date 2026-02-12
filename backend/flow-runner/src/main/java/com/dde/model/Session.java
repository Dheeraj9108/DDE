package com.dde.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.dde.enums.DiagnosisStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Session {
		
	@Id
	@GeneratedValue
	private UUID id;
	
	private UUID flowId;
	
	private DiagnosisStatus status;
	
	@CreationTimestamp
	private LocalDateTime createdAt;
		
	@OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SessionStep> steps; 
	
	private String currentNodeId;
	
	@UpdateTimestamp
	private LocalDateTime lastUpdatedAt;
}
