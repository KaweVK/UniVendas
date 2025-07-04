package com.uni.vendas.controllers;

import com.uni.vendas.data.dto.v1.ItemDTO;
import com.uni.vendas.error.ErrorAnswer;
import com.uni.vendas.exception.DuplicatedRegisterException;
import com.uni.vendas.exception.OperationNotAllowedException;
import com.uni.vendas.models.Item;
import com.uni.vendas.services.ItemService;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
        var idItem = UUID.fromString(id);
        Optional<Item> itemOptional = itemService.findById(idItem);
        if (itemOptional.isPresent()) {
            Item item = itemOptional.get();
            ItemDTO dto = new ItemDTO(
                    item.getId(),
                    item.getName(),
                    item.getDescription(),
                    item.getAmount(),
                    item.getPrice()
            );
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();

    }

    @GetMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<List<ItemDTO>> searchByExample(@PathParam("name") String name) {
        List<Item> items = itemService.searchAuthorsByExample(name);
        List<ItemDTO> itemDTOS = items.stream()
                .map(item -> new ItemDTO(
                        item.getId(),
                        item.getName(),
                        item.getDescription(),
                        item.getAmount(),
                        item.getPrice()))
                .toList();
        return ResponseEntity.ok(itemDTOS);

    }

    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Object> createItem(@RequestBody @Valid ItemDTO itemDTO) {
        try {
            var item = itemDTO.MapToItem();
            itemService.createItem(item);

            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(item.getId())
                    .toUri();

            return ResponseEntity.created(location)
                    .body("Author created successfully with ID: " + item.getId());
        } catch (DuplicatedRegisterException e) {
            var errorDTO = ErrorAnswer.conflictAnswer(e.getMessage());
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        } catch (Exception e) {
            var errorDTO = ErrorAnswer.internalServerErrorAnswer(e.getMessage());
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    @PutMapping(
            value = "/{id}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Object> updateItem(@PathVariable("id") String id, @RequestBody @Valid ItemDTO itemDTO) {
        try {

            var idItem = UUID.fromString(id);
            Optional<Item> itemOptional = itemService.findById(idItem);
            if (itemOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            var item = itemOptional.get();
            itemService.updateItem(item);
            item.setName(itemDTO.name());
            item.setDescription(itemDTO.description());
            item.setAmount(itemDTO.amount());
            item.setPrice(itemDTO.price());
            itemService.updateItem(item);

            return ResponseEntity.noContent().build();

        } catch (DuplicatedRegisterException e) {
            var errorDTO = ErrorAnswer.conflictAnswer(e.getMessage());
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        } catch (IllegalArgumentException e) {
            var errorDTO = ErrorAnswer.defaultAnswer(e.getMessage());
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        } catch (Exception e) {
            var errorDTO = ErrorAnswer.internalServerErrorAnswer(e.getMessage());
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteItem(@PathVariable("id") String id) {
        try {
            var idItem = UUID.fromString(id);
            Optional<Item> authorOptional = itemService.findById(idItem);
            if (authorOptional.isPresent()) {
                itemService.deleteItem(idItem);
                return ResponseEntity.ok("Item deleted successfully.");
            }
            return ResponseEntity.notFound().build();
        } catch (OperationNotAllowedException | IllegalArgumentException e) {
            var errorDTO = ErrorAnswer.defaultAnswer(e.getMessage());
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        } catch (Exception e) {
            var errorDTO = ErrorAnswer.internalServerErrorAnswer(e.getMessage());
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

}
