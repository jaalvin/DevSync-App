package com.devsync.dto;

import lombok.Data;

@Data
public class UserSettingsDto {
    
    private String id;
    private UserProfileDto profile;
    private NotificationSettingsDto notifications;
    private CallSettingsDto calls;
    private PrivacySettingsDto privacy;
    private ThemeSettingsDto theme;
    private WorkspaceSettingsDto workspace;
}