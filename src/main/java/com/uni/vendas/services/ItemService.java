package com.uni.vendas.services;

import com.uni.vendas.controllers.ItemController;
import com.uni.vendas.data.dto.v1.ItemDTO;
import com.uni.vendas.exceptions.ResourceNotFoundException;
import com.uni.vendas.models.Item;
import com.uni.vendas.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import static com.uni.vendas.mapper.DozerObjectMapper.parseListObjects;
import static com.uni.vendas.mapper.DozerObjectMapper.parseObject;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class ItemService {

    private Logger logger = LoggerFactory.getLogger(ItemService.class.getName());

    @Autowired
    private ItemRepository repository;

    public List<ItemDTO> findAll() {
        logger.info("Finding all items");
        var items = parseListObjects(repository.findAll(), ItemDTO.class);
        logger.info("Found {} items", items.size());

        items.forEach(this::addHateoasLinks);

        return items;
    }


    public ItemDTO findById(Long id) {
        logger.info("Finding a item by id: {}", id);
        var item = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
        logger.info("Found item: {}+--", item);

        var dto = parseObject(item, ItemDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    public ItemDTO createItem(ItemDTO itemDTO) {
        logger.info("Creating a item: {}", itemDTO);
        var item = parseObject(itemDTO, Item.class);

        var dto = parseObject(repository.save(item), ItemDTO.class);

        logger.info("Created item: {}", dto);

        addHateoasLinks(dto);

        return dto;

    }

    public ItemDTO updateItem(ItemDTO itemDTO) {
        logger.info("Updating item: {}", itemDTO.getId());

        var oldItem = repository.findById(itemDTO.getId()).orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + itemDTO.getId()));
        logger.info("Found item: {}", oldItem.getId());

        oldItem.setName(itemDTO.getName());
        oldItem.setDescription(itemDTO.getDescription());
        oldItem.setAmount(itemDTO.getAmount());
        oldItem.setPrice(itemDTO.getPrice());

        var dto = parseObject(repository.save(oldItem), ItemDTO.class);
        logger.info("Updated item: {}", dto);

        addHateoasLinks(dto);

        return dto;
    }

    public void deleteItem(Long id) {
        logger.info("Deleting item: {}", id);
        var item = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person not found for this id: " + id));
        repository.delete(item);
        logger.info("Deleted item: {}", id);
    }

    private ItemDTO addHateoasLinks(ItemDTO dto) {
        dto.add(linkTo(methodOn(ItemController.class).findById(dto.getId())).withSelfRel().withType("GET"));
        dto.add(linkTo(methodOn(ItemController.class).findAll()).withRel("findAll").withType("GET"));
        dto.add(linkTo(methodOn(ItemController.class).createItem(dto)).withRel("create").withType("POST"));
        dto.add(linkTo(methodOn(ItemController.class).deleteItem(dto.getId())).withRel("delete").withType("DELETE"));
        dto.add(linkTo(methodOn(ItemController.class).updateItem(dto)).withRel("update").withType("PUT"));

        return dto;
    }

}
