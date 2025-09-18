package com.devsync.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class WorkspaceSettingsDto {
    
    private String id;
    
    @Size(max = 50, message = "Default channel name cannot exceed 50 characters")
    private String defaultChannel;
    
    private List<String> sidebarOrder;
    private Boolean showChannelSuggestions;
    private Boolean autoMarkAsRead;
    private Boolean enterToSend;
    private Boolean formatMessages;
}