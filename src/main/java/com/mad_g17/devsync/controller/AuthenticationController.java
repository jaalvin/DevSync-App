package com.mad_g17.devsync.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mad_g17.devsync.model.User;
import com.mad_g17.devsync.repository.UserRepository;
import com.mad_g17.devsync.security.JwtUtil;
import com.mad_g17.devsync.service.MyUserDetailsService;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

// Login: Accepts username or email + password, returns JWT
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
    String identifier = request.get("username"); // can be username or email
    if (identifier == null) identifier = request.get("email");
    String password = request.get("password");

    System.out.println("Login attempt: identifier=" + identifier + ", password=" + password);

    try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(identifier, password)
        );
    } catch (BadCredentialsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of("error", "Invalid credentials"));
    } catch (DisabledException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of("error", "User account is disabled"));
    } catch (LockedException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of("error", "User account is locked"));
    } catch (AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of("error", "Authentication failed"));
    }

    final UserDetails userDetails = userDetailsService.loadUserByUsername(identifier);
    final String jwt = jwtUtil.generateToken(userDetails.getUsername());

    return ResponseEntity.ok(Map.of("token", jwt));
}

    // Signup (optional): Register new user
    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody Map<String, String> request) {
        System.out.println("Signup endpoint hit!");
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");

        if (userRepository.findByUsername(username).isPresent()) {
            return Map.of("error", "Username already exists");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            return Map.of("error", "Email already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);

        return Map.of("message", "User registered successfully");
    }
}
