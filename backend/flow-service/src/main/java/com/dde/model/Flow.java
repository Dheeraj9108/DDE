package com.dde.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Flow {
		
	@Id
	@GeneratedValue
	private UUID id;
		
	@Column(nullable = false)
	private String name;
	
	private String description;
	
//	@Column(nullable = false)
//    private Integer version;
//
//    @Enumerated(EnumType.STRING)
//    private FlowStatus status; // DRAFT, PUBLISHED, ARCHIVED
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id", nullable=false)
	private Project project;
	
	@OneToMany(mappedBy="flow", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Node> nodes;
	
	@OneToMany(mappedBy="flow", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Edge> edges; 
	
	@CreationTimestamp
	private LocalDateTime createdAt;
}
