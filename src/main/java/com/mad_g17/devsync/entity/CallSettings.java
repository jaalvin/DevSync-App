package com.devsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "call_settings")
@Data
@EqualsAndHashCode(callSuper = false)
public class CallSettings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_settings_id", nullable = false)
    @NotNull
    private UserSettings userSettings;
    
    @Size(max = 100)
    @Column(name = "microphone_id")
    private String microphoneId = "default";
    
    @Size(max = 100)
    @Column(name = "camera_id")
    private String cameraId = "default";
    
    @Size(max = 100)
    @Column(name = "speaker_id")
    private String speakerId = "default";
    
    @Column(name = "noise_cancellation_enabled", nullable = false)
    private Boolean noiseCancellationEnabled = true;
    
    @Column(name = "auto_join_audio", nullable = false)
    private Boolean autoJoinAudio = true;
    
    @Column(name = "auto_join_video", nullable = false)
    private Boolean autoJoinVideo = false;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "screen_share_quality", nullable = false)
    private ScreenShareQuality screenShareQuality = ScreenShareQuality.MEDIUM;
    
    @Column(name = "background_blur_enabled", nullable = false)
    private Boolean backgroundBlurEnabled = false;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Version
    private Long version;
    
    public enum ScreenShareQuality {
        LOW, MEDIUM, HIGH
    }
}