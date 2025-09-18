package com.mad_g17.devsync.service;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mad_g17.devsync.model.User;
import com.mad_g17.devsync.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    //Loads user by username or email from DB and returns Spring Security compatible UserDetails object.
    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        // Try username first, then email
        User user = userRepository.findByUsername(identifier)
            .or(() -> userRepository.findByEmail(identifier))
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + identifier));
        System.out.println("Loaded user: " + user.getUsername() + " / " + user.getEmail() + ", password hash: " + user.getPassword());

        Set<GrantedAuthority> authorities = user.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
            .collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }
}
