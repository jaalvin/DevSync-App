package com.mad_g17.devsync.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.mad_g17.devsync.model.ConversationMember;
import com.mad_g17.devsync.repository.ConversationMemberRepository;

@Component
public class ConversationSecurityService {

    @Autowired
    private ConversationMemberRepository conversationMemberRepository;

    public boolean isAdmin(Long conversationId, Authentication authentication) {
        String username = authentication.getName();

        return conversationMemberRepository.findByConversationIdAndUserUsername(conversationId, username)
                .map(member -> member.getRole() == ConversationMember.Role.ADMIN)  // compare enum directly
                .orElse(false);  // if not found, return false
    }

    public boolean isMember(Long conversationId, Authentication authentication) {
        String username = authentication.getName();

        return conversationMemberRepository.findByConversationIdAndUserUsername(conversationId, username).isPresent();
    }
}
