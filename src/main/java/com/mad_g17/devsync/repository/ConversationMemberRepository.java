package com.mad_g17.devsync.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mad_g17.devsync.model.ConversationMember;

@Repository
public interface ConversationMemberRepository extends JpaRepository<ConversationMember, com.mad_g17.devsync.model.ConversationMemberId> {
    boolean existsByConversationIdAndUserUsernameAndRole(Long conversationId, String username, String role);
    Optional<ConversationMember> findByConversationIdAndUserUsername(Long conversationId, String username);
}
