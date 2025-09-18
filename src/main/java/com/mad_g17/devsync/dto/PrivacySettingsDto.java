package com.devsync.dto;

import com.devsync.entity.PrivacySettings;
import lombok.Data;

@Data
public class PrivacySettingsDto {
    
    private String id;
    private Boolean showOnlineStatus;
    private PrivacySettings.DirectMessagePermission allowDirectMessages;
    private PrivacySettings.ProfileVisibility profileVisibility;
    private Boolean searchableByEmail;
    private Boolean readReceiptsEnabled;
    private Boolean typingIndicatorsEnabled;
}