package com.mad_g17.devsync.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mad_g17.devsync.model.User;

public interface UserRepository extends JpaRepository<User, Long> { // This interface extends JpaRepository to provide CRUD operations for User entities.

    // Method to find a user by username
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
