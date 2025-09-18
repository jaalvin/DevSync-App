package com.mad_g17.devsync.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "channel_members")
public class ChannelMember {

    @Id
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channel channel;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "joined_at")
    private Timestamp joinedAt;

    // Getters and setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Channel getChannel() {
        return channel;
    }
    public void setChannel(Channel channel) {
        this.channel = channel;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Timestamp getJoinedAt() {
        return joinedAt;
    }
    public void setJoinedAt(Timestamp joinedAt) {
        this.joinedAt = joinedAt;
    }
}