package com.dde.serviceimpl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Service;

import com.dde.dto.Conversation;
import com.dde.dto.Edge;
import com.dde.dto.FlowMetadata;
import com.dde.dto.InternalNodeData;
import com.dde.dto.Node;
import com.dde.dto.QuestionDTO;
import com.dde.dto.StartDiagnosisDTO;
import com.dde.dto.StartDiagnosisRequestDTO;
import com.dde.dto.SummaryDTO;
import com.dde.dto.TerminalNodeData;
import com.dde.dto.UserResponseDTO;
import com.dde.enums.DiagnosisStatus;
import com.dde.enums.InputType;
import com.dde.model.Session;
import com.dde.model.SessionStep;
import com.dde.repository.SessionRepository;
import com.dde.service.IDiagService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiagServiceImpl implements IDiagService {

	private final SessionRepository sessionRepo;

	private final CacheFacadeService cacheFacadeService;

	@Override
	public StartDiagnosisDTO startDiagnosis(StartDiagnosisRequestDTO diagnosisRequestDTO) {

		StartDiagnosisDTO dto = new StartDiagnosisDTO();
		FlowMetadata flowMetaData = cacheFacadeService.getFlowMetaData(diagnosisRequestDTO.getFlowId());
		dto.setFlowMetadata(flowMetaData);

		// Create Session
		Session session = new Session();
		session.setFlowId(flowMetaData.getId());
		session.setStatus(DiagnosisStatus.IN_PROGRESS);
		Node questionNode = getFirstQuestion(flowMetaData.getId());
		session.setCurrentNodeId(questionNode.getId());
		session.setSteps(new ArrayList<>());
		session = sessionRepo.save(session);
		session.setSteps(new ArrayList<>());
		cacheFacadeService.saveSession(session);

		QuestionDTO question = getQuestion(session, questionNode);

		dto.setQuestion(question);
		dto.setSessionId(session.getId());
		return dto;
	}

	private Node getFirstQuestion(UUID flowId) {
		List<Node> nodes = cacheFacadeService.getAllNodes(flowId);
		Node startNode = nodes.stream().filter(node -> "startNode".equals(node.getType())).findFirst().get();
		List<Edge> edges = cacheFacadeService.getEdges(flowId, startNode.getId());
		return cacheFacadeService.getNode(flowId, edges.get(0).getTarget());
	}

	@Override
	@Transactional
	public QuestionDTO nextQuestion(UserResponseDTO userResponse) {
		Session session = cacheFacadeService.getSession(userResponse.getSessionId());
		SessionStep sessionStep = SessionStep.builder().answer(userResponse.getAnswer())
				.prompt(userResponse.getPrompt()).session(session).nodeId(userResponse.getNodeId()).build();
		saveEvidences(sessionStep, session.getFlowId(), userResponse);
		session.getSteps().add(sessionStep);
		Node nextNode = getNextNode(session.getFlowId(), userResponse.getNodeId(), userResponse.getAnswer(), 0);
		session.setCurrentNodeId(nextNode.getId());
		cacheFacadeService.saveSession(session);
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
		Node curNode = cacheFacadeService.getNode(flowId, userResponse.getNodeId());
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
		Node nextNode = cacheFacadeService.getNode(flowId, edge.getTarget());
		if (nextNode.getType().equals("resultNode")) {
			return getNextNode(flowId, nextNode.getId(), userAnswer, 1);
		}
		return nextNode;
	}

	private Optional<Edge> getMatchingEdge(UUID flowId, String nodeId, String userAnswer, int level) {
		Node curNode = cacheFacadeService.getNode(flowId, nodeId);
		List<Edge> edges = cacheFacadeService.getEdges(flowId, nodeId);
		if (level == 1)
			return Optional.ofNullable(edges.get(0));
		if (curNode.getType().equals("action")) {
			return parseExpressions(edges, userAnswer, curNode);
		}
		Optional<Edge> matchingEdge = edges.stream()
				.filter(edge -> edge.getData() != null && edge.getData().getCondition().equals(userAnswer)).findFirst();
		return matchingEdge;
	}

	private Optional<Edge> parseExpressions(List<Edge> edges, String userAnswer, Node node) {
		try {
			Optional<Edge> elseEdge = edges.stream()
					.filter(edge -> edge.getData() != null && edge.getData().getCondition().equals("else")).findFirst();
			Double value = Double.parseDouble(userAnswer);
			ExpressionParser parser = new SpelExpressionParser();
			StandardEvaluationContext context = new StandardEvaluationContext();
			context.setVariable(node.getData().getLabel(), value);

			for (Edge edge : edges) {
				if (edge.getData() != null && !edge.getData().getCondition().equals("else")) {

					Boolean result = parser.parseExpression(edge.getData().getCondition()).getValue(context,
							Boolean.class);

					if (Boolean.TRUE.equals(result)) {
						return Optional.of(edge);
					}
				}
			}

			return elseEdge;
		} catch (Exception e) {
			return Optional.empty();
		}
	}

	@Override
	public SummaryDTO getSummary(UUID sessionId) {
		Session session = cacheFacadeService.getSession(sessionId);
		Node terminalNode = cacheFacadeService.getNode(session.getFlowId(), session.getCurrentNodeId());

		FlowMetadata flow = cacheFacadeService.getFlowMetaData(session.getFlowId());
		SummaryDTO summary = new SummaryDTO();
		if (terminalNode.getData() instanceof TerminalNodeData terminalNodeData) {
			summary.setIssue(terminalNodeData.getIssue());
			summary.setSummary(terminalNodeData.getSummary());
			summary.setStatus(terminalNodeData.getStatus());
			summary.setConfidence(terminalNodeData.getConfidence());
			summary.setRecommendedSteps(terminalNodeData.getRecommendedSteps());
		}
		summary.setFlowName(flow.getName());
		summary.setCompletedTime(LocalDateTime.now());
		processSessionSteps(summary, session);

		cacheFacadeService.deleteSession(sessionId);
		return summary;
	}

	@Transactional
	private void updateSession(Session session) {
		Session persistedSession = sessionRepo.findById(session.getId()).orElseThrow();
		List<SessionStep> sessionSteps = session.getSteps().stream().map(step -> {
			step.setSession(persistedSession);
			return step;
		}).collect(Collectors.toList());
		persistedSession.setSteps(sessionSteps);
		sessionRepo.save(persistedSession);
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

}
