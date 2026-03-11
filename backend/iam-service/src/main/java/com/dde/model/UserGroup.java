package com.dde.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.dde.enums.Role;

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
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table( name = "user_group", 
	uniqueConstraints = {
			@UniqueConstraint(columnNames = {"user_id", "group_id"})
	}
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserGroup {
	
	@Id
	@GeneratedValue
	private UUID id;
	
	@Column(name = "user_id", nullable = false)
	private UUID userId;
	
	@Column(name = "group_id", nullable = false)
	private UUID groupId;
	
	private boolean isProjectOwner;
	
	@ElementCollection(fetch=FetchType.LAZY)
	@CollectionTable(
		name = "user_group_role",
		joinColumns = @JoinColumn(name = "user_group_id")
	)
	@Enumerated(EnumType.STRING)
	private List<Role> roles = new ArrayList<>();
}
