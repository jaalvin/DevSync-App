package com.devsync.service;

import com.devsync.dto.*;
import com.devsync.entity.*;
import com.devsync.exception.ResourceNotFoundException;
import com.devsync.exception.UserSettingsException;
import com.devsync.mapper.UserSettingsMapper;
import com.devsync.repository.UserRepository;
import com.devsync.repository.UserSettingsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserSettingsService {
    
    private final UserSettingsRepository userSettingsRepository;
    private final UserRepository userRepository;
    private final UserSettingsMapper userSettingsMapper;
    
    @Cacheable(value = "userSettings", key = "#userId")
    @Transactional(readOnly = true)
    public UserSettingsDto getUserSettings(String userId) {
        log.debug("Fetching settings for user: {}", userId);
        
        UserSettings userSettings = userSettingsRepository.findByUserIdWithAllSettings(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User settings not found for user: " + userId));
        
        return userSettingsMapper.toDto(userSettings);
    }
    
    @CacheEvict(value = "userSettings", key = "#userId")
    public UserSettingsDto initializeUserSettings(String userId) {
        log.info("Initializing settings for user: {}", userId);
        
        User user = userRepository.findActiveUserById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        
        if (userSettingsRepository.existsByUserId(userId)) {
            throw new UserSettingsException("Settings already exist for user: " + userId);
        }
        
        UserSettings userSettings = createDefaultSettings(user);
        UserSettings savedSettings = userSettingsRepository.save(userSettings);
        
        log.info("Successfully initialized settings for user: {}", userId);
        return userSettingsMapper.toDto(savedSettings);
    }
    
    @CacheEvict(value = "userSettings", key = "#userId")
    public UserProfileDto updateUserProfile(String userId, UserProfileDto profileDto) {
        log.info("Updating profile for user: {}", userId);
        
        try {
            User user = userRepository.findActiveUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
            
            userSettingsMapper.updateUserFromDto(profileDto, user);
            User savedUser = userRepository.save(user);
            
            log.info("Successfully updated profile for user: {}", userId);
            return userSettingsMapper.userToProfileDto(savedUser);
            
        } catch (OptimisticLockingFailureException e) {
            log.warn("Optimistic locking failure while updating profile for user: {}", userId);
            throw new UserSettingsException("Profile was modified by another user. Please refresh and try again.");
        }
    }
    
    @CacheEvict(value = "userSettings", key = "#userId")
    public NotificationSettingsDto updateNotificationSettings(String userId, NotificationSettingsDto notificationDto) {
        log.info("Updating notification settings for user: {}", userId);
        
        try {
            UserSettings userSettings = getUserSettingsEntity(userId);
            
            if (userSettings.getNotificationSettings() == null) {
                userSettings.setNotificationSettings(new NotificationSettings());
                userSettings.getNotificationSettings().setUserSettings(userSettings);
            }
            
            userSettingsMapper.updateNotificationSettingsFromDto(notificationDto, userSettings.getNotificationSettings());
            UserSettings savedSettings = userSettingsRepository.save(userSettings);
            
            log.info("Successfully updated notification settings for user: {}", userId);
            return userSettingsMapper.notificationSettingsToDto(savedSettings.getNotificationSettings());
            
        } catch (OptimisticLockingFailureException e) {
            log.warn("Optimistic locking failure while updating notification settings for user: {}", userId);
            throw new UserSettingsException("Settings were modified by another user. Please refresh and try again.");
        }
    }
    
    @CacheEvict(value = "userSettings", key = "#userId")
    public CallSettingsDto updateCallSettings(String userId, CallSettingsDto callDto) {
        log.info("Updating call settings for user: {}", userId);
        
        try {
            UserSettings userSettings = getUserSettingsEntity(userId);
            
            if (userSettings.getCallSettings() == null) {
                userSettings.setCallSettings(new CallSettings());
                userSettings.getCallSettings().setUserSettings(userSettings);
            }
            
            userSettingsMapper.updateCallSettingsFromDto(callDto, userSettings.getCallSettings());
            UserSettings savedSettings = userSettingsRepository.save(userSettings);
            
            log.info("Successfully updated call settings for user: {}", userId);
            return userSettingsMapper.callSettingsToDto(savedSettings.getCallSettings());
            
        } catch (OptimisticLockingFailureException e) {
            log.warn("Optimistic locking failure while updating call settings for user: {}", userId);
            throw new UserSettingsException("Settings were modified by another user. Please refresh and try again.");
        }
    }
    
    @CacheEvict(value = "userSettings", key = "#userId")
    public PrivacySettingsDto updatePrivacySettings(String userId, PrivacySettingsDto privacyDto) {
        log.info("Updating privacy settings for user: {}", userId);
        
        try {
            UserSettings userSettings = getUserSettingsEntity(userId);
            
            if (userSettings.getPrivacySettings() == null) {
                userSettings.setPrivacySettings(new PrivacySettings());
                userSettings.getPrivacySettings().setUserSettings(userSettings);
            }
            
            userSettingsMapper.updatePrivacySettingsFromDto(privacyDto, userSettings.getPrivacySettings());
            UserSettings savedSettings = userSettingsRepository.save(userSettings);
            
            log.info("Successfully updated privacy settings for user: {}", userId);
            return userSettingsMapper.privacySettingsToDto(savedSettings.getPrivacySettings());
            
        } catch (OptimisticLockingFailureException e) {
            log.warn("Optimistic locking failure while updating privacy settings for user: {}", userId);
            throw new UserSettingsException("Settings were modified by another user. Please refresh and try again.");
        }
    }
    
    @CacheEvict(value = "userSettings", key = "#userId")
    public ThemeSettingsDto updateThemeSettings(String userId, ThemeSettingsDto themeDto) {
        log.info("Updating theme settings for user: {}", userId);
        
        try {
            UserSettings userSettings = getUserSettingsEntity(userId);
            
            if (userSettings.getThemeSettings() == null) {
                userSettings.setThemeSettings(new ThemeSettings());
                userSettings.getThemeSettings().setUserSettings(userSettings);
            }
            
            userSettingsMapper.updateThemeSettingsFromDto(themeDto, userSettings.getThemeSettings());
            UserSettings savedSettings = userSettingsRepository.save(userSettings);
            
            log.info("Successfully updated theme settings for user: {}", userId);
            return userSettingsMapper.themeSettingsToDto(savedSettings.getThemeSettings());
            
        } catch (OptimisticLockingFailureException e) {
            log.warn("Optimistic locking failure while updating theme settings for user: {}", userId);
            throw new UserSettingsException("Settings were modified by another user. Please refresh and try again.");
        }
    }
    
    @CacheEvict(value = "userSettings", key = "#userId")
    public WorkspaceSettingsDto updateWorkspaceSettings(String userId, WorkspaceSettingsDto workspaceDto) {
        log.info("Updating workspace settings for user: {}", userId);
        
        try {
            UserSettings userSettings = getUserSettingsEntity(userId);
            
            if (userSettings.getWorkspaceSettings() == null) {
                userSettings.setWorkspaceSettings(new WorkspaceSettings());
                userSettings.getWorkspaceSettings().setUserSettings(userSettings);
            }
            
            userSettingsMapper.updateWorkspaceSettingsFromDto(workspaceDto, userSettings.getWorkspaceSettings());
            UserSettings savedSettings = userSettingsRepository.save(userSettings);
            
            log.info("Successfully updated workspace settings for user: {}", userId);
            return userSettingsMapper.workspaceSettingsToDto(savedSettings.getWorkspaceSettings());
            
        } catch (OptimisticLockingFailureException e) {
            log.warn("Optimistic locking failure while updating workspace settings for user: {}", userId);
            throw new UserSettingsException("Settings were modified by another user. Please refresh and try again.");
        }
    }
    
    @CacheEvict(value = "userSettings", key = "#userId")
    public void resetUserSettings(String userId) {
        log.info("Resetting settings for user: {}", userId);
        
        User user = userRepository.findActiveUserById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        
        UserSettings existingSettings = userSettingsRepository.findByUserId(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User settings not found for user: " + userId));
        
        userSettingsRepository.delete(existingSettings);
        
        UserSettings newSettings = createDefaultSettings(user);
        userSettingsRepository.save(newSettings);
        
        log.info("Successfully reset settings for user: {}", userId);
    }
    
    private UserSettings getUserSettingsEntity(String userId) {
        return userSettingsRepository.findByUserIdWithAllSettings(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User settings not found for user: " + userId));
    }
    
    private UserSettings createDefaultSettings(User user) {
        UserSettings userSettings = new UserSettings();
        userSettings.setUser(user);
        
        // Initialize notification settings
        NotificationSettings notificationSettings = new NotificationSettings();
        notificationSettings.setUserSettings(userSettings);
        notificationSettings.setKeywords(new ArrayList<>());
        userSettings.setNotificationSettings(notificationSettings);
        
        // Initialize call settings
        CallSettings callSettings = new CallSettings();
        callSettings.setUserSettings(userSettings);
        userSettings.setCallSettings(callSettings);
        
        // Initialize privacy settings
        PrivacySettings privacySettings = new PrivacySettings();
        privacySettings.setUserSettings(userSettings);
        userSettings.setPrivacySettings(privacySettings);
        
        // Initialize theme settings
        ThemeSettings themeSettings = new ThemeSettings();
        themeSettings.setUserSettings(userSettings);
        userSettings.setThemeSettings(themeSettings);
        
        // Initialize workspace settings
        WorkspaceSettings workspaceSettings = new WorkspaceSettings();
        workspaceSettings.setUserSettings(userSettings);
        userSettings.setWorkspaceSettings(workspaceSettings);
        
        return userSettings;
    }
}