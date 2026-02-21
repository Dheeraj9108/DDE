package com.dde.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dde.model.SessionStep;

public interface SessionStepRepository extends JpaRepository<SessionStep, UUID>{}
