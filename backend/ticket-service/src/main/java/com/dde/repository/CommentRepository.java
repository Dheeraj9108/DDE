package com.dde.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dde.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, UUID>{}
