package com.devsync.dto;

import com.devsync.entity.ThemeSettings;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ThemeSettingsDto {
    
    private String id;
    private ThemeSettings.ThemeMode mode;
    
    @Pattern(regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", message = "Invalid hex color format")
    @Size(min = 4, max = 7, message = "Accent color must be a valid hex color")
    private String accentColor;
    
    private ThemeSettings.FontSize fontSize;
    private ThemeSettings.Density density;
}