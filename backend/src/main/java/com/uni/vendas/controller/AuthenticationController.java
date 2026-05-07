package com.uni.vendas.controller;

import com.uni.vendas.dto.AuthenticationDataDto;
import com.uni.vendas.model.Seller;
import com.uni.vendas.service.TokenService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private static final String JWT_COOKIE_NAME = "jwt_token";
    private static final int TOKEN_DURATION_SECONDS = 2 * 60 * 60;

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> efetuarLogin(
            @RequestBody @Valid AuthenticationDataDto data,
            HttpServletResponse response
    ) {
        var tokenAuth = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var authentication = authenticationManager.authenticate(tokenAuth);

        var usuario = (Seller) authentication.getPrincipal();
        var tokenJwt = tokenService.generateToken(usuario);
        var cookie = buildJwtCookie(tokenJwt, TOKEN_DURATION_SECONDS);

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of(
                "id", usuario.getId(),
                "email", usuario.getEmail()
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> efetuarLogout(HttpServletResponse response) {
        var cookie = buildJwtCookie("", 0);
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getSessaoAtual(Authentication authentication) {
        var usuario = (Seller) authentication.getPrincipal();
        var body = new HashMap<String, Object>();
        body.put("id", usuario.getId());
        body.put("email", usuario.getEmail());
        body.put("name", usuario.getName());
        body.put("image", usuario.getImage());
        return ResponseEntity.ok(body);
    }

    private ResponseCookie buildJwtCookie(String value, int maxAge) {
        return ResponseCookie.from(JWT_COOKIE_NAME, value)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(maxAge)
                .sameSite("None")
                .build();

    }
}
