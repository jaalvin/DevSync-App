// This filter runs for every request and checks if the JWT is valid.
package com.mad_g17.devsync.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mad_g17.devsync.service.MyUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private MyUserDetailsService userDetailsService; // we'll create this in the next step


@Override
protected void doFilterInternal(
    @NonNull HttpServletRequest request,
    @NonNull HttpServletResponse response,
    @NonNull FilterChain filterChain) throws ServletException, IOException {

    String path = request.getRequestURI();
    // Skip JWT check for public endpoints
    if (path.startsWith("/api/auth/")) {
        filterChain.doFilter(request, response);
        return;
    }

    final String authHeader = request.getHeader("Authorization");

    String username = null;
    String jwt = null;

    // 1. Extract JWT from "Authorization" header (format: "Bearer <token>")
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
        jwt = authHeader.substring(7); // remove "Bearer "
        username = jwtUtil.extractUsername(jwt); // get username from token
    }

    // 2. If username is extracted and no auth is set in security context
    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // 3. Set the authentication in the context
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }

    // 4. Continue the request
    filterChain.doFilter(request, response);
    }
}