package com.dde.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dde.models.FlowNode;

public interface FlowRepository extends JpaRepository<FlowNode, Integer>{

}
