package com.dde.serviceimpl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Service;

import com.dde.dto.Conversation;
import com.dde.dto.CursorPageResponseDTO;
import com.dde.dto.EdgeDTO;
import com.dde.dto.EdgesWrapper;
import com.dde.dto.FlowCursor;
import com.dde.dto.FlowListDTO;
import com.dde.dto.FlowMetadataDTO;
import com.dde.dto.FlowRequestDTO;
import com.dde.dto.FlowResponseDTO;
import com.dde.dto.FlowTemplateDTO;
import com.dde.dto.NodeDTO;
import com.dde.dto.NodesWrapper;
import com.dde.dto.NotificationEvent;
import com.dde.dto.QuestionDTO;
import com.dde.dto.ReviewRequestDTO;
import com.dde.dto.StartDiagnosisDTO;
import com.dde.dto.StartDiagnosisRequestDTO;
import com.dde.dto.SummaryDTO;
import com.dde.dto.UserResponseDTO;
import com.dde.enums.DiagnosisStatus;
import com.dde.enums.FlowStatus;
import com.dde.enums.InputType;
import com.dde.model.Edge;
import com.dde.model.Flow;
import com.dde.model.InternalNodeData;
import com.dde.model.Node;
import com.dde.model.Session;
import com.dde.model.SessionStep;
import com.dde.model.TerminalNodeData;
import com.dde.repository.EdgeRepository;
import com.dde.repository.FlowRepository;
import com.dde.repository.NodeRepository;
import com.dde.repository.SessionRepository;
import com.dde.service.IFlowService;
import com.dde.util.CursorCodec;
import com.dde.util.DtoModelMapper;

import jakarta.transaction.Transactional;

@Service
public class FlowServiceImpl implements IFlowService {

	@Autowired
	private FlowRepository flowRepo;

	@Autowired
	private DtoModelMapper dtoMapper;

	@Autowired
	private SessionRepository sessionRepo;

	@Autowired
	private NodeRepository nodeRepo;

	@Autowired
	private EdgeRepository edgeRepo;

	@Autowired
	private CursorCodec codec;
	
	@Autowired
	private EventPublisher eventPublisher;

	@Override
	public List<FlowListDTO> getFlows(UUID projectId) {
		return dtoMapper.toFlowDTOs(flowRepo.findByProjectId(projectId));
	}

	@Override
	public UUID createFlowTemplate(FlowTemplateDTO flowDto) {
		return flowRepo.createFlowTemplate(flowDto.getProjectId(), flowDto.getName(), flowDto.getDescription());
	}

	@Override
	public void deleteFlowTemplate(UUID id) {
		flowRepo.deleteById(id);
	}

	@Override
	public FlowResponseDTO getFlowById(UUID id) {
		Flow flow = flowRepo.findById(id).orElseThrow();
		return dtoMapper.toFlowDTO(flow);
	}

	@Override
	@Transactional
	public void updateFlow(FlowRequestDTO flowDTO) {
		Flow flow = flowRepo.findById(flowDTO.getId()).orElseThrow();

		patchNodes(flow, flowDTO.getNodes());
		patchEdges(flow, flowDTO.getEdges());
	}

	private void patchNodes(Flow flow, NodesWrapper nodes) {
		Map<String, Node> existingNodeMap = flow.getNodes().stream()
				.collect(Collectors.toMap(Node::getId, Function.identity()));

		for (NodeDTO node : nodes.getUpserts()) {
			Node existingNode = existingNodeMap.getOrDefault(node.getId(), null);
			if (existingNode != null) {
				// update
				existingNode.setType(node.getType());
				existingNode.setData(node.getData());
			} else {
				// Insert
				Node newNode = new Node();
				newNode.setId(node.getId());
				newNode.setData(node.getData());
				newNode.setFlow(flow);
				newNode.setType(node.getType());

				flow.getNodes().add(newNode);
			}
		}

		// delete nodes
		Set<UUID> nodeToDelete = nodes.getDeletes().stream().map(NodeDTO::getNodeId).collect(Collectors.toSet());
		flow.getNodes().removeIf(node -> nodeToDelete.contains(node.getNodeId()));
	}

	private void patchEdges(Flow flow, EdgesWrapper edges) {
		Map<String, Edge> existingEdgeMap = flow.getEdges().stream()
				.collect(Collectors.toMap(Edge::getId, Function.identity()));

		for (EdgeDTO edge : edges.getUpserts()) {
			Edge existingEdge = existingEdgeMap.getOrDefault(edge.getId(), null);
			if (existingEdge != null) {
				// update
				existingEdge.setSource(edge.getSource());
				existingEdge.setTarget(edge.getTarget());
				existingEdge.setStyle(edge.getStyle());
				existingEdge.setData(edge.getData());
			} else {
				// Insert
				Edge newEdge = new Edge();
				newEdge.setId(edge.getId());
				newEdge.setFlow(flow);
				newEdge.setSource(edge.getSource());
				newEdge.setTarget(edge.getTarget());
				newEdge.setStyle(edge.getStyle());
				newEdge.setData(edge.getData());
				flow.getEdges().add(newEdge);
			}
		}

		// delete edges
		Set<UUID> edgeToDelete = edges.getDeletes().stream().map(EdgeDTO::getEdgeId).collect(Collectors.toSet());
		flow.getEdges().removeIf(edge -> edgeToDelete.contains(edge.getEdgeId()));
	}

	@Override
	public CursorPageResponseDTO getFlowsforPagination(String cursor, int limit) {
		List<FlowListDTO> flows = new ArrayList<>();
		if (cursor == null || cursor.isBlank()) {
			flows = dtoMapper.toFlowDTOs(flowRepo.getFirstPage(PageRequest.ofSize(limit)));
		} else {
			FlowCursor decoded = cursor == null ? null : codec.decode(cursor);
			flows = dtoMapper.toFlowDTOs(flowRepo.getNextPage(decoded == null ? null : decoded.getCreatedAt(),
					decoded == null ? null : decoded.getId(), PageRequest.ofSize(limit)));
		}
		String next = "";
		if (!flows.isEmpty()) {
			next = codec.encode(
					new FlowCursor(flows.get(flows.size() - 1).getCreatedAt(), flows.get(flows.size() - 1).getId()));

		}
		return new CursorPageResponseDTO(next, flows);
	}

	@Override
	public FlowMetadataDTO getFlowMetadata(UUID id) {
		Flow flow = flowRepo.findById(id).orElseThrow();
		FlowMetadataDTO dto = dtoMapper.toFlowMetadataDTO(flow);
		return dto;
	}

	@Override
	@Transactional
	public StartDiagnosisDTO startDiagnosis(StartDiagnosisRequestDTO diagnosisRequestDTO) {
		StartDiagnosisDTO dto = new StartDiagnosisDTO();
		Flow flow = flowRepo.findById(diagnosisRequestDTO.getFlowId()).orElseThrow();
		dto.setFlowMetadata(dtoMapper.toFlowMetadataDTO(flow));

		// Create Session
		Session session = new Session();
		session.setFlowId(flow.getId());
		session.setStatus(DiagnosisStatus.IN_PROGRESS);
		session.setSteps(new ArrayList<>());
		Node questionNode = getFirstQuestion(flow.getId());
		session.setCurrentNodeId(questionNode.getNodeId());
		session = sessionRepo.save(session);

		QuestionDTO question = getQuestion(session, questionNode);

		dto.setQuestion(question);
		dto.setSessionId(session.getId());
		return dto;
	}

	private Node getFirstQuestion(UUID flowId) {
		Node startNode = nodeRepo.findByFlowIdAndType(flowId, "startNode");
		List<Edge> edges = edgeRepo.findByFlowIdAndSource(flowId, startNode.getId());
		return nodeRepo.findByFlowIdAndId(flowId, edges.get(0).getTarget());
	}

	@Override
	@Transactional
	public QuestionDTO nextQuestion(UserResponseDTO userResponse) {
		Session session = sessionRepo.findById(userResponse.getSessionId()).orElseThrow();
		SessionStep sessionStep = SessionStep.builder().answer(userResponse.getAnswer())
				.prompt(userResponse.getPrompt()).session(session).nodeId(userResponse.getNodeId()).build();
		saveEvidences(sessionStep, session.getFlowId(), userResponse);
		session.getSteps().add(sessionStep);
		Node nextNode = getNextNode(session.getFlowId(), userResponse.getNodeId(), userResponse.getAnswer(), 0);
		session.setCurrentNodeId(nextNode.getNodeId());
		sessionRepo.save(session);
		return getQuestion(session, nextNode);
	}

	private QuestionDTO getQuestion(Session session, Node nextNode) {
		QuestionDTO question = new QuestionDTO();
		question.setSessionId(session.getId());
		question.setFlowId(session.getFlowId());
		List<String> options = new ArrayList<>();
		if (nextNode.getData() instanceof InternalNodeData nodeData) {
			question.setContent(nodeData.getContent());
			options = Optional.ofNullable(nodeData.getOptions()).orElse(Collections.emptyList()).stream()
					.map(option -> option.getValue()).collect(Collectors.toList());
		}
		setInputType(nextNode, question);
		question.setEnd(nextNode.getType().equals("endNode"));

		question.setOptions(options);
		question.setNodeId(nextNode.getId());

		return question;
	}

	private void setInputType(Node node, QuestionDTO question) {
		if (node.getType().equals("action")) {
			question.setInputType(InputType.NUMBER);
		} else {
			question.setInputType(InputType.OPTION);
		}
	}

	private void saveEvidences(SessionStep sessionStep, UUID flowId, UserResponseDTO userResponse) {
		Node curNode = nodeRepo.findByFlowIdAndId(flowId, userResponse.getNodeId());
		if (curNode.getData() instanceof InternalNodeData curNodeData) {
			Optional<List<String>> evidence = Optional.ofNullable(curNodeData.getOptions())
					.orElse(Collections.emptyList()).stream()
					.filter(option -> option.getValue().equals(userResponse.getAnswer()))
					.map(option -> option.getEvidence()).findFirst();
			if (evidence.isPresent()) {
				sessionStep.setEvidences(evidence.get());
			}
		}
	}

	private Node getNextNode(UUID flowId, String nodeId, String userAnswer, int level) {

		Optional<Edge> matchingEdge = getMatchingEdge(flowId, nodeId, userAnswer, level);

		if (!matchingEdge.isPresent()) {
			return null;
		}

		Edge edge = matchingEdge.get();
		Node nextNode = nodeRepo.findByFlowIdAndId(flowId, edge.getTarget());
		if (nextNode.getType().equals("resultNode")) {
			return getNextNode(flowId, nextNode.getId(), userAnswer, 1);
		}
		return nextNode;
	}

	private Optional<Edge> getMatchingEdge(UUID flowId, String nodeId, String userAnswer, int level) {
		Node curNode = nodeRepo.findByFlowIdAndId(flowId, nodeId);
		List<Edge> edges = edgeRepo.findByFlowIdAndSource(flowId, nodeId);
		if(level == 1) return Optional.ofNullable(edges.get(0));
		if (curNode.getType().equals("action")) {
			return parseExpressions(edges, userAnswer, curNode);
		}
		Optional<Edge> matchingEdge = edges.stream().filter(edge -> edge.getData().getCondition().equals(userAnswer))
				.findFirst();
		return matchingEdge;
	}

	private Optional<Edge> parseExpressions(List<Edge> edges, String userAnswer, Node node) {
		try {
			Optional<Edge> elseEdge = edges.stream().filter(edge -> edge.getData().getCondition().equals("else"))
					.findFirst();
			Double value = Double.parseDouble(userAnswer);
			ExpressionParser parser = new SpelExpressionParser();
			StandardEvaluationContext context = new StandardEvaluationContext();
			context.setVariable(node.getData().getLabel(), value);

			for (Edge edge : edges) {
				if (!edge.getData().getCondition().equals("else")) {

					Boolean result = parser.parseExpression(edge.getData().getCondition()).getValue(context,
							Boolean.class);

					if (Boolean.TRUE.equals(result)) {
						return Optional.of(edge);
					}
				}
			}

			return elseEdge;
		} catch (Exception e) {
			// TODO: handle exception
			return Optional.empty();
		}
	}

	@Override
	public SummaryDTO getSummary(UUID sessionId) {
		Session session = sessionRepo.findById(sessionId).orElseThrow();
		Node terminalNode = nodeRepo.findById(session.getCurrentNodeId()).orElseThrow();
		Flow flow = flowRepo.findById(session.getFlowId()).orElseThrow();
		SummaryDTO summary = new SummaryDTO();
		if (terminalNode.getData() instanceof TerminalNodeData terminalNodeData) {
			summary = dtoMapper.toSummaryDTO(terminalNodeData);
		}
		summary.setFlowName(flow.getName());
		summary.setCompletedTime(session.getLastUpdatedAt());
		processSessionSteps(summary, session);
		return summary;
	}

	public void processSessionSteps(SummaryDTO summary, Session session) {
		summary.setEvidences(Optional.ofNullable(session.getSteps()).orElse(Collections.emptyList()).stream()
				.flatMap(step -> Optional.ofNullable(step.getEvidences()).orElse(Collections.emptyList()).stream())
				.toList());

		List<Conversation> conversations = new ArrayList<>();
		Optional.ofNullable(session.getSteps()).orElse(Collections.emptyList()).stream().forEach(step -> {
			Conversation conversation = new Conversation();
			conversation.setAnswer(step.getAnswer());
			conversation.setPrompt(step.getPrompt());
			conversations.add(conversation);
		});
		summary.setCoversations(conversations);
	}

	@Override
	public void startReview(UUID id) {
		Flow flow = flowRepo.findById(id).orElseThrow();
		flow.setStatus(FlowStatus.UNDER_REVIEW);
		flowRepo.save(flow);
	}

	@Override
	public void requestReview(ReviewRequestDTO reviewRequestDTO) {
		Flow flow = flowRepo.findById(reviewRequestDTO.getFlowId()).orElseThrow();
		flow.setStatus(FlowStatus.SUBMITTED);
		flowRepo.save(flow);
		NotificationEvent event = new NotificationEvent();
		event.setId(UUID.randomUUID());
		event.setEmail("poojarydheeraj665@gmail.com");
		eventPublisher.publishEvent(event);
	}
}
