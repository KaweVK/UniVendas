package com.uni.vendas.controllers;

import com.uni.vendas.data.dto.ItemDTO;
import com.uni.vendas.services.ItemService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shop/v1")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    @RequestMapping(value = "/{id}",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_YAML_VALUE}
    )
    public ItemDTO getItemById(@PathParam("id") Long id) {
        var item = itemService.findById(id);

        return item;
    }

    @GetMapping
    @RequestMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_YAML_VALUE}
    )
    public List<ItemDTO> getAllItems() {
        var items = itemService.findAll();

        return items;
    }

    @PostMapping
    @RequestMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_YAML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_YAML_VALUE}
    )
    public ItemDTO createItem(@RequestBody ItemDTO itemDTO) {
        return itemService.createItem(itemDTO);
    }

    @PutMapping
    @RequestMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_YAML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_YAML_VALUE}
    )
    public ItemDTO updateItem(@RequestBody ItemDTO itemDTO) {
        return itemService.updateItem(itemDTO);
    }

}
