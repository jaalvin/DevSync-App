package com.mad_g17.devsync.dto;

public class ChannelDto {
    private String name;

    // Constructors
    public ChannelDto() {}

    public ChannelDto(String name) {
        this.name = name;
    }

    // Getter
    public String getName() {
        return name;
    }

    // Setter
    public void setName(String name) {
        this.name = name;
    }
}
