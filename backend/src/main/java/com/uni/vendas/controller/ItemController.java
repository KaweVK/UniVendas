package com.uni.vendas.controller;

import com.uni.vendas.dto.ResponseItemDTO;
import com.uni.vendas.dto.RegisterItemDTO;
import com.uni.vendas.model.Item;
import com.uni.vendas.model.Seller;
import com.uni.vendas.service.ItemService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.NoSuchElementException;
import java.util.Optional;

@SecurityRequirement(name = "bearer-key")
@RestController
@RequestMapping("/shop")
@RequiredArgsConstructor
public class ItemController {

    private static final String ID_PATH = "/{id}";
    private final ItemService itemService;

    @GetMapping(ID_PATH)
    public ResponseEntity<ResponseItemDTO> findById(@PathVariable("id") String id) {
        try {
            return ResponseEntity.ok().body(itemService.findById(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping( "/all")
    public ResponseEntity<Page<ResponseItemDTO>> findAll(
            @RequestParam(value = "page", defaultValue = "0")
            Integer page,
            @RequestParam(value = "size", defaultValue = "10")
            Integer size
    ) {
        Page<ResponseItemDTO> itens = itemService.findAll(page, size);
        return ResponseEntity.ok(itens);
    }


    @PostMapping(
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}
    )
    public ResponseEntity<Object> createItem(@Valid @ModelAttribute RegisterItemDTO registerItemDTO, Authentication authentication) {
        Seller current = (Seller) authentication.getPrincipal();

        Item item = itemService.createItem(registerItemDTO, current);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path(ID_PATH)
                .buildAndExpand(item.getId())
                .toUri();

        return ResponseEntity.created(location)
                .body("Author created successfully with ID: " + item.getId());
    }

    @PutMapping(
            value = ID_PATH,
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}
    )
    public ResponseEntity<Object> updateItem(@PathVariable String id, @ModelAttribute @Valid RegisterItemDTO registerItemDTO) {
        try {
            return ResponseEntity.ok(itemService.updateItem(id, registerItemDTO));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(ID_PATH)
    public ResponseEntity<Object> deleteItem(@PathVariable String id) {
        try {
            itemService.deleteItem(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping( "/search")
    public ResponseEntity<Page<ResponseItemDTO>> searchItems(
            @RequestParam(value = "name", required = false)
            String name,
            @RequestParam(value = "description", required = false)
            String description,
            @RequestParam(value = "priceLess", required = false)
            Double priceLess,
            @RequestParam(value = "priceGreater", required = false)
            Double priceGreater,
            @RequestParam(value = "page", defaultValue = "0")
            Integer page,
            @RequestParam(value = "size", defaultValue = "10")
            Integer size,
            @RequestParam(value = "category", required = false)
            String category
    ) {
        Page<ResponseItemDTO> pageResult = itemService.searchItem(name, description, priceLess, priceGreater, page, size, category);

        return ResponseEntity.ok(pageResult);
    }


}
