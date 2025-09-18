package com.mad_g17.devsync.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    @GetMapping("/{id}")
    @PreAuthorize("@conversationSecurityService.isMember(#id, authentication)")
    public ResponseEntity<?> viewConversation(@PathVariable Long id) {
        return ResponseEntity.ok("You can view conversation " + id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@conversationSecurityService.isAdmin(#id, authentication)")
    public ResponseEntity<?> deleteConversation(@PathVariable Long id) {
        return ResponseEntity.ok("Conversation " + id + " deleted!");
    }

    @PostMapping("/{id}/messages")
    @PreAuthorize("@conversationSecurityService.isMember(#id, authentication)")
    public ResponseEntity<?> postMessage(@PathVariable Long id, @RequestBody String content) {
        return ResponseEntity.ok("Message posted to conversation " + id);
    }
}
