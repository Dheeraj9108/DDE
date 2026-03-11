package com.dde.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dde.model.UserGroup;

public interface UserGroupRepository extends JpaRepository<UserGroup, UUID>{
	List<UserGroup> findByUserIdInAndGroupId(List<UUID> userId, UUID groupId);
	List<UserGroup> findByGroupId(UUID groupId);
}
