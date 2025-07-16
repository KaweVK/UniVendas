package com.uni.vendas.controllers;

import com.uni.vendas.data.dto.ItemDTO;
import com.uni.vendas.models.Item;
import com.uni.vendas.services.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/shop/")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping(
            value = "/{id}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Object> findById(@PathVariable("id") String id) {

        var item = itemService.findById(id);
        if (item.isPresent()) {
            return ResponseEntity.ok().body(item);
        }
        return ResponseEntity.notFound().build();

    }


    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Object> createItem(@RequestBody @Valid ItemDTO itemDTO) {
        Item item = itemService.createItem(itemDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(item.getId())
                .toUri();

        return ResponseEntity.created(location)
                .body("Author created successfully with ID: " + item.getId());
    }

    @PutMapping(
            value = "/{id}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Object> updateItem(@PathVariable("id") String id, @RequestBody @Valid ItemDTO itemDTO) {
        Optional<ItemDTO> itemOptional = itemService.updateItem(id, itemDTO);;
        if (itemOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteItem(@PathVariable("id") String id) {
        Optional<ItemDTO> authorOptional = itemService.findById(id);
        if (authorOptional.isPresent()) {
            itemService.deleteItem(id);
            return ResponseEntity.ok("Item deleted successfully.");
        }
        return ResponseEntity.notFound().build();
    }

}
