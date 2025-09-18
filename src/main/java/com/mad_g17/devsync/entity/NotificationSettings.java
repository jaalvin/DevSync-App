package com.devsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "notification_settings")
@Data
@EqualsAndHashCode(callSuper = false)
public class NotificationSettings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_settings_id", nullable = false)
    @NotNull
    private UserSettings userSettings;
    
    @Column(name = "desktop_enabled", nullable = false)
    private Boolean desktopEnabled = true;
    
    @Column(name = "mobile_enabled", nullable = false)
    private Boolean mobileEnabled = true;
    
    @Column(name = "email_enabled", nullable = false)
    private Boolean emailEnabled = false;
    
    @Column(name = "mentions_enabled", nullable = false)
    private Boolean mentionsEnabled = true;
    
    @Column(name = "direct_messages_enabled", nullable = false)
    private Boolean directMessagesEnabled = true;
    
    @Column(name = "channel_messages_enabled", nullable = false)
    private Boolean channelMessagesEnabled = false;
    
    @Column(name = "threads_enabled", nullable = false)
    private Boolean threadsEnabled = true;
    
    @Column(name = "reactions_enabled", nullable = false)
    private Boolean reactionsEnabled = false;
    
    @Column(name = "reminders_enabled", nullable = false)
    private Boolean remindersEnabled = true;
    
    @ElementCollection
    @CollectionTable(name = "notification_keywords", joinColumns = @JoinColumn(name = "notification_settings_id"))
    @Column(name = "keyword")
    private List<String> keywords = new ArrayList<>();
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Version
    private Long version;
}