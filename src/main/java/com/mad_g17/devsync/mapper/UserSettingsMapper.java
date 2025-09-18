package com.devsync.mapper;

import com.devsync.dto.*;
import com.devsync.entity.*;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserSettingsMapper {
    
    // UserSettings mappings
    @Mapping(source = "user", target = "profile")
    UserSettingsDto toDto(UserSettings userSettings);
    
    // User Profile mappings
    UserProfileDto userToProfileDto(User user);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDto(UserProfileDto dto, @MappingTarget User user);
    
    // Notification Settings mappings
    NotificationSettingsDto notificationSettingsToDto(NotificationSettings notificationSettings);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateNotificationSettingsFromDto(NotificationSettingsDto dto, @MappingTarget NotificationSettings notificationSettings);
    
    // Call Settings mappings
    CallSettingsDto callSettingsToDto(CallSettings callSettings);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCallSettingsFromDto(CallSettingsDto dto, @MappingTarget CallSettings callSettings);
    
    // Privacy Settings mappings
    PrivacySettingsDto privacySettingsToDto(PrivacySettings privacySettings);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updatePrivacySettingsFromDto(PrivacySettingsDto dto, @MappingTarget PrivacySettings privacySettings);
    
    // Theme Settings mappings
    ThemeSettingsDto themeSettingsToDto(ThemeSettings themeSettings);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateThemeSettingsFromDto(ThemeSettingsDto dto, @MappingTarget ThemeSettings themeSettings);
    
    // Workspace Settings mappings
    WorkspaceSettingsDto workspaceSettingsToDto(WorkspaceSettings workspaceSettings);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateWorkspaceSettingsFromDto(WorkspaceSettingsDto dto, @MappingTarget WorkspaceSettings workspaceSettings);
}