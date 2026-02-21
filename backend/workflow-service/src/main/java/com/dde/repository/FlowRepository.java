package com.dde.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dde.model.Flow;

public interface FlowRepository extends JpaRepository<Flow, UUID> {
	
	@Query(value="SELECT create_flow_with_defaults(:projectId, :name, :description)", nativeQuery = true)
	public UUID createFlowTemplate(@Param("projectId")UUID projectId,@Param("name")String name,@Param("description")String desription);
	
	public List<Flow> findByProjectId(UUID projectId);
	
	@Query(value = """
		    SELECT *
		    FROM flow f
		    WHERE f.created_at < :createdAt
		       OR (f.created_at = :createdAt AND f.id < :id)
		    ORDER BY f.created_at DESC, f.id DESC
		    """, nativeQuery = true)
	public List<Flow> getNextPage(@Param("createdAt") LocalDateTime createdAt, @Param("id") UUID id, Pageable pageable);
	
	@Query("Select f from Flow f Order by f.createdAt DESC, f.id")
	public List<Flow> getFirstPage(Pageable pageabel);
}