package com.dde.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dde.model.Group;
import com.dde.model.User;
import com.dde.model.UserGroup;

public interface GroupRepository extends JpaRepository<Group, UUID>{
	Group findByInviteCode(UUID code);
	
	@Query("SELECT g.members FROM Group g WHERE g.id = :groupId")
	List<User> findMembersByGroupId(@Param("groupId") UUID groupId);
}
