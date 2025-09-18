package com.devsync.dto;

import com.devsync.entity.CallSettings;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CallSettingsDto {
    
    private String id;
    
    @Size(max = 100, message = "Microphone ID cannot exceed 100 characters")
    private String microphoneId;
    
    @Size(max = 100, message = "Camera ID cannot exceed 100 characters")
    private String cameraId;
    
    @Size(max = 100, message = "Speaker ID cannot exceed 100 characters")
    private String speakerId;
    
    private Boolean noiseCancellationEnabled;
    private Boolean autoJoinAudio;
    private Boolean autoJoinVideo;
    private CallSettings.ScreenShareQuality screenShareQuality;
    private Boolean backgroundBlurEnabled;
}