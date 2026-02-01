package com.dde.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class ActionNode {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	private String operator;
	
	private String value;
	
	private String seconfValue;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="target_node_id")
	private FlowNode targetNodeId;
	
	@ManyToOne
	@JoinColumn(name="node_id")
	private FlowNode node;
}
