package com.devsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "theme_settings")
@Data
@EqualsAndHashCode(callSuper = false)
public class ThemeSettings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_settings_id", nullable = false)
    @NotNull
    private UserSettings userSettings;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "theme_mode", nullable = false)
    private ThemeMode mode = ThemeMode.LIGHT;
    
    @Pattern(regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", message = "Invalid hex color format")
    @Size(min = 4, max = 7)
    @Column(name = "accent_color", nullable = false)
    private String accentColor = "#2563EB";
    
    @Enumerated(EnumType.STRING)
    @Column(name = "font_size", nullable = false)
    private FontSize fontSize = FontSize.MEDIUM;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "density", nullable = false)
    private Density density = Density.COMFORTABLE;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Version
    private Long version;
    
    public enum ThemeMode {
        LIGHT, DARK, SYSTEM
    }
    
    public enum FontSize {
        SMALL, MEDIUM, LARGE
    }
    
    public enum Density {
        COMPACT, COMFORTABLE, SPACIOUS
    }
}