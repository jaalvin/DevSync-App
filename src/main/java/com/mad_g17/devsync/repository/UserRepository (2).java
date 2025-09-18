package com.devsync.repository;

import com.devsync.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.id = :userId AND u.isActive = true")
    Optional<User> findActiveUserById(@Param("userId") String userId);
    
    boolean existsByEmail(String email);
}