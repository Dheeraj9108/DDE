package com.dde.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class FlowNode {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	@Enumerated(EnumType.STRING)
	private NodeType nodeType;
	
	private String title;
	
	private boolean isRootNode;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="yes_node_id")
	private FlowNode yesNodeId;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "no_node_id")
	private FlowNode noNodeId;
	
	private String inputType;
	
	@ManyToOne
	@JoinColumn(name = "flow_id")
	private DiagnosticFlow flow;
	
	@OneToMany(mappedBy = "node", cascade = CascadeType.ALL)
	private List<ActionNode> actionNode;
}
