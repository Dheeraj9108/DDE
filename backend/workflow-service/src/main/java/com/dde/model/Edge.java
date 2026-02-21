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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Edge {

	@Id
	@GeneratedValue
	private UUID edgeId;
	
	@Column(name="ui_id")
	private String id;

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "source")
//	private Node source;
//
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "target")
//	private Node target;
	
	private String source;

	private String target;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "flow_id")
//	@JsonIgnore
	private Flow flow;
		
	@JdbcTypeCode(SqlTypes.JSON)
	@Column(columnDefinition = "jsonb")
	private EdgeStyle style;

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(columnDefinition = "jsonb")
	private EdgeData data;
}
