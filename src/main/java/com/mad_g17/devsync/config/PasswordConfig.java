package com.mad_g17.devsync.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


// This class is a configuration class for Spring Security, specifically for password encoding.
@Configuration
public class PasswordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    /* The @Bean makes PasswordEncoder available across your app (e.g., in AuthController).
    BCryptPasswordEncoder securely hashes passwords before saving to the database. */
}
