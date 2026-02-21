package com.dde.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dde.model.Group;

public interface GroupRepository extends JpaRepository<Group, UUID>{
	Group findByInviteCode(UUID code);
}
