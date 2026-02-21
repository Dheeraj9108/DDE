package com.dde.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dde.model.Project;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
	
	List<Project> findByGroupId(UUID groupId);
}
