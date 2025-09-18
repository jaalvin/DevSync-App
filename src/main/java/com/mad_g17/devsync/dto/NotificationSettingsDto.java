package com.devsync.dto;

import lombok.Data;

import java.util.List;

@Data
public class NotificationSettingsDto {
    
    private String id;
    private Boolean desktopEnabled;
    private Boolean mobileEnabled;
    private Boolean emailEnabled;
    private Boolean mentionsEnabled;
    private Boolean directMessagesEnabled;
    private Boolean channelMessagesEnabled;
    private Boolean threadsEnabled;
    private Boolean reactionsEnabled;
    private Boolean remindersEnabled;
    private List<String> keywords;
}