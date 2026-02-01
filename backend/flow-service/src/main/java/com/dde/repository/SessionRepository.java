package com.dde.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dde.model.Session;

public interface SessionRepository extends JpaRepository<Session, UUID>{}
