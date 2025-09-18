package com.devsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "workspace_settings")
@Data
@EqualsAndHashCode(callSuper = false)
public class WorkspaceSettings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_settings_id", nullable = false)
    @NotNull
    private UserSettings userSettings;
    
    @Size(max = 50)
    @Column(name = "default_channel")
    private String defaultChannel = "general";
    
    @ElementCollection
    @CollectionTable(name = "sidebar_order", joinColumns = @JoinColumn(name = "workspace_settings_id"))
    @Column(name = "sidebar_item")
    @OrderColumn(name = "order_index")
    private List<String> sidebarOrder = List.of("channels", "direct-messages", "threads");
    
    @Column(name = "show_channel_suggestions", nullable = false)
    private Boolean showChannelSuggestions = true;
    
    @Column(name = "auto_mark_as_read", nullable = false)
    private Boolean autoMarkAsRead = false;
    
    @Column(name = "enter_to_send", nullable = false)
    private Boolean enterToSend = true;
    
    @Column(name = "format_messages", nullable = false)
    private Boolean formatMessages = true;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Version
    private Long version;
}