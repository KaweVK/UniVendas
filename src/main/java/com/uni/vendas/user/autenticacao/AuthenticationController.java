package com.uni.vendas.user.autenticacao;

import com.uni.vendas.user.models.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager manager;
    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDataDto dto) {
        var token = new UsernamePasswordAuthenticationToken(dto.email(), dto.password());
        var auth = manager.authenticate(token);

        var tokenJwt = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new TokenJwtDto(tokenJwt));
    }

}
