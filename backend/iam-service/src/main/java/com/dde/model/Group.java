package com.dde.model;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="dde_group")
public class Group {

	@Id
	@GeneratedValue
	private UUID id;

	private String name;

	private String description;

	@CreationTimestamp
	private LocalDateTime createdAt;
	
	private UUID inviteCode;

	@ManyToOne
	@JoinColumn(name = "owner_id", nullable = false)
	private User owner;
	
	@ManyToMany(mappedBy = "groups", fetch = FetchType.LAZY)
	private Set<User> members;
}
