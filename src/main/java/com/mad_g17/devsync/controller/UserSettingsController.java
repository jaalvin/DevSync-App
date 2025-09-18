package com.devsync.controller;

import com.devsync.dto.*;
import com.devsync.service.UserSettingsService;
import com.devsync.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users/{userId}/settings")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserSettingsController {
    
    private final UserSettingsService userSettingsService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<UserSettingsDto>> getUserSettings(
            @PathVariable String userId,
            Authentication authentication) {
        
        log.info("Getting settings for user: {}", userId);
        UserSettingsDto settings = userSettingsService.getUserSettings(userId);
        
        return ResponseEntity.ok(ApiResponse.success(settings, "Settings retrieved successfully"));
    }
    
    @PostMapping("/initialize")
    public ResponseEntity<ApiResponse<UserSettingsDto>> initializeUserSettings(
            @PathVariable String userId,
            Authentication authentication) {
        
        log.info("Initializing settings for user: {}", userId);
        UserSettingsDto settings = userSettingsService.initializeUserSettings(userId);
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(settings, "Settings initialized successfully"));
    }
    
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileDto>> updateUserProfile(
            @PathVariable String userId,
            @Valid @RequestBody UserProfileDto profileDto,
            Authentication authentication) {
        
        log.info("Updating profile for user: {}", userId);
        UserProfileDto updatedProfile = userSettingsService.updateUserProfile(userId, profileDto);
        
        return ResponseEntity.ok(ApiResponse.success(updatedProfile, "Profile updated successfully"));
    }
    
    @PutMapping("/notifications")
    public ResponseEntity<ApiResponse<NotificationSettingsDto>> updateNotificationSettings(
            @PathVariable String userId,
            @Valid @RequestBody NotificationSettingsDto notificationDto,
            Authentication authentication) {
        
        log.info("Updating notification settings for user: {}", userId);
        NotificationSettingsDto updatedSettings = userSettingsService.updateNotificationSettings(userId, notificationDto);
        
        return ResponseEntity.ok(ApiResponse.success(updatedSettings, "Notification settings updated successfully"));
    }
    
    @PutMapping("/calls")
    public ResponseEntity<ApiResponse<CallSettingsDto>> updateCallSettings(
            @PathVariable String userId,
            @Valid @RequestBody CallSettingsDto callDto,
            Authentication authentication) {
        
        log.info("Updating call settings for user: {}", userId);
        CallSettingsDto updatedSettings = userSettingsService.updateCallSettings(userId, callDto);
        
        return ResponseEntity.ok(ApiResponse.success(updatedSettings, "Call settings updated successfully"));
    }
    
    @PutMapping("/privacy")
    public ResponseEntity<ApiResponse<PrivacySettingsDto>> updatePrivacySettings(
            @PathVariable String userId,
            @Valid @RequestBody PrivacySettingsDto privacyDto,
            Authentication authentication) {
        
        log.info("Updating privacy settings for user: {}", userId);
        PrivacySettingsDto updatedSettings = userSettingsService.updatePrivacySettings(userId, privacyDto);
        
        return ResponseEntity.ok(ApiResponse.success(updatedSettings, "Privacy settings updated successfully"));
    }
    
    @PutMapping("/theme")
    public ResponseEntity<ApiResponse<ThemeSettingsDto>> updateThemeSettings(
            @PathVariable String userId,
            @Valid @RequestBody ThemeSettingsDto themeDto,
            Authentication authentication) {
        
        log.info("Updating theme settings for user: {}", userId);
        ThemeSettingsDto updatedSettings = userSettingsService.updateThemeSettings(userId, themeDto);
        
        return ResponseEntity.ok(ApiResponse.success(updatedSettings, "Theme settings updated successfully"));
    }
    
    @PutMapping("/workspace")
    public ResponseEntity<ApiResponse<WorkspaceSettingsDto>> updateWorkspaceSettings(
            @PathVariable String userId,
            @Valid @RequestBody WorkspaceSettingsDto workspaceDto,
            Authentication authentication) {
        
        log.info("Updating workspace settings for user: {}", userId);
        WorkspaceSettingsDto updatedSettings = userSettingsService.updateWorkspaceSettings(userId, workspaceDto);
        
        return ResponseEntity.ok(ApiResponse.success(updatedSettings, "Workspace settings updated successfully"));
    }
    
    @PostMapping("/reset")
    public ResponseEntity<ApiResponse<Void>> resetUserSettings(
            @PathVariable String userId,
            Authentication authentication) {
        
        log.info("Resetting settings for user: {}", userId);
        userSettingsService.resetUserSettings(userId);
        
        return ResponseEntity.ok(ApiResponse.success(null, "Settings reset successfully"));
    }
}