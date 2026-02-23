package com.dde.model;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.dde.enums.ProjectRole;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table( name = "project_collaborators", 
	uniqueConstraints = {
			@UniqueConstraint(columnNames = {"project_id", "user_id"})
	}
)
public class ProjectCollaborator {
	
	@Id
	@GeneratedValue
	private UUID id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id",nullable = false)
	private Project project;
	
	@Column(name = "user_id",nullable = false)
	private UUID userId;
	
	@CreationTimestamp
	private LocalDateTime createAt;
	
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(
			name = "project_collaborator_roles",
			joinColumns = @JoinColumn(name="collaborator_id")
	)
	@Enumerated(EnumType.STRING)
	@Column(name="role")
	private Set<ProjectRole> roles;
}
