package com.devsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "privacy_settings")
@Data
@EqualsAndHashCode(callSuper = false)
public class PrivacySettings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_settings_id", nullable = false)
    @NotNull
    private UserSettings userSettings;
    
    @Column(name = "show_online_status", nullable = false)
    private Boolean showOnlineStatus = true;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "allow_direct_messages", nullable = false)
    private DirectMessagePermission allowDirectMessages = DirectMessagePermission.EVERYONE;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "profile_visibility", nullable = false)
    private ProfileVisibility profileVisibility = ProfileVisibility.PUBLIC;
    
    @Column(name = "searchable_by_email", nullable = false)
    private Boolean searchableByEmail = true;
    
    @Column(name = "read_receipts_enabled", nullable = false)
    private Boolean readReceiptsEnabled = true;
    
    @Column(name = "typing_indicators_enabled", nullable = false)
    private Boolean typingIndicatorsEnabled = true;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Version
    private Long version;
    
    public enum DirectMessagePermission {
        EVERYONE, TEAM_MEMBERS, NOBODY
    }
    
    public enum ProfileVisibility {
        PUBLIC, TEAM_ONLY, PRIVATE
    }
}