package com.dde.model;

import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
		uniqueConstraints = {@UniqueConstraint(columnNames = {"flow_id", "ui_id"})}
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Node {
		
	@Id
	@GeneratedValue
	private UUID nodeId;
	
	@Column(name="ui_id", nullable=false)
	private String id;

	private String type;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "flow_id", nullable=false)
//	@JsonIgnore
	private Flow flow;
	
	@JdbcTypeCode(SqlTypes.JSON)
	@Column(columnDefinition = "jsonb")
	private NodeData data;
}

