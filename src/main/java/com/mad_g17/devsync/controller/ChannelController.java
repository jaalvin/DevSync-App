package com.mad_g17.devsync.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mad_g17.devsync.dto.ChannelDto;


@RestController
@RequestMapping("/api/channels")
public class ChannelController {

    @PreAuthorize("hasAnyRole('ADMIN', 'MEMBER')")
    @GetMapping
    public List<String> getAllChannels() {
        return List.of("general", "random", "project-x");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createChannel(@RequestBody ChannelDto channelDto) {
        return ResponseEntity.ok("Channel '" + channelDto.getName() + "' created by admin!");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MEMBER')")
    @GetMapping("/list")
    public ResponseEntity<?> listChannels() {
        return ResponseEntity.ok(List.of("general", "random", "project-x"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChannel(@PathVariable Long id) {
        return ResponseEntity.ok("Channel with id " + id + " deleted!");
    }

    @PreAuthorize("@conversationSecurityService.isAdmin(#conversationId, authentication)")
    @PostMapping("/{conversationId}/create")
    public ResponseEntity<?> createChannel(@PathVariable Long conversationId, @RequestBody ChannelDto channelDto) {
        // logic to create channel
        return ResponseEntity.ok("Channel created in conversation " + conversationId);
    }

    @PreAuthorize("@conversationSecurityService.isMember(#conversationId, authentication)")
    @GetMapping("/{conversationId}/list")
    public ResponseEntity<?> listChannels(@PathVariable Long conversationId) {
        // logic to list channels
        return ResponseEntity.ok(List.of("general", "random", "project-x"));
    }

    @PreAuthorize("@conversationSecurityService.isAdmin(#conversationId, authentication)")
    @DeleteMapping("/{conversationId}/{channelId}")
    public ResponseEntity<?> deleteChannel(@PathVariable Long conversationId, @PathVariable Long channelId) {
        // logic to delete channel
        return ResponseEntity.ok("Channel deleted in conversation " + conversationId);
    }
}