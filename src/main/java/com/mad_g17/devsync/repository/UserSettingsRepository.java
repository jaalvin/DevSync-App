package com.devsync.repository;

import com.devsync.entity.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, String> {
    
    Optional<UserSettings> findByUserId(String userId);
    
    @Query("SELECT us FROM UserSettings us " +
           "LEFT JOIN FETCH us.notificationSettings " +
           "LEFT JOIN FETCH us.callSettings " +
           "LEFT JOIN FETCH us.privacySettings " +
           "LEFT JOIN FETCH us.themeSettings " +
           "LEFT JOIN FETCH us.workspaceSettings " +
           "WHERE us.user.id = :userId")
    Optional<UserSettings> findByUserIdWithAllSettings(@Param("userId") String userId);
    
    boolean existsByUserId(String userId);
}