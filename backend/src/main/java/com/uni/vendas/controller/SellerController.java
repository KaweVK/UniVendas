package com.uni.vendas.controller;

import com.uni.vendas.dto.RegisterSellerDTO;
import com.uni.vendas.dto.ResponseSellerDTO;
import com.uni.vendas.model.Seller;
import com.uni.vendas.service.SellerService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@SecurityRequirement(name = "bearer-key")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class SellerController {

    private static final String ID_PATH = "/{id}";
    private final SellerService sellerService;

    @GetMapping(ID_PATH)
    public ResponseEntity<Object> findUserById(@PathVariable("id") String id) {
        var user = sellerService.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ResponseSellerDTO> createUser(
            @ModelAttribute @Valid RegisterSellerDTO userDTO,
            @RequestParam @NotBlank String code) {
        Seller seller = sellerService.createUserWithVerification(userDTO, code);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(seller.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping(
            value = ID_PATH,
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}
    )
    public ResponseEntity<ResponseSellerDTO> updateUser(@PathVariable String id, @ModelAttribute @Valid RegisterSellerDTO dto, Authentication authentication) {
        Seller current = (Seller) authentication.getPrincipal();

        if (!current.getId().toString().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Optional<ResponseSellerDTO> userOptional = sellerService.updateUser(id, dto);
        if (userOptional.isPresent()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping(ID_PATH)
    public ResponseEntity<Object> deleteUser(@PathVariable String id, Authentication authentication) {
        Seller current = (Seller) authentication.getPrincipal();
        if (!current.getId().toString().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Optional<ResponseSellerDTO> userOptional = sellerService.findById(id);
        if (userOptional.isPresent()) {
            sellerService.deleteUser(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(
            value = "/search",
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<Page<ResponseSellerDTO>> sarchUsers(
            @RequestParam(value = "name", required = false)
            String name,
            @RequestParam(value = "email", required = false)
            String email,
            @RequestParam(value = "phone_number", required = false)
            String phoneNumber,
            @RequestParam(value = "page", defaultValue = "0")
            Integer page,
            @RequestParam(value = "size", defaultValue = "10")
            Integer size
    ) {
        Page<ResponseSellerDTO> pageResult = sellerService.search(name, email, phoneNumber, page, size);

        return ResponseEntity.ok(pageResult);
    }

}
