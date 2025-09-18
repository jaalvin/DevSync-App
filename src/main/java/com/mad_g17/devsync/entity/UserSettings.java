package com.devsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_settings")
@Data
@EqualsAndHashCode(callSuper = false)
public class UserSettings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @NotNull
    private User user;
    
    @OneToOne(mappedBy = "userSettings", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private NotificationSettings notificationSettings;
    
    @OneToOne(mappedBy = "userSettings", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private CallSettings callSettings;
    
    @OneToOne(mappedBy = "userSettings", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private PrivacySettings privacySettings;
    
    @OneToOne(mappedBy = "userSettings", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ThemeSettings themeSettings;
    
    @OneToOne(mappedBy = "userSettings", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private WorkspaceSettings workspaceSettings;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Version
    private Long version;
}