package com.uni.vendas.services;

import com.uni.vendas.models.Item;
import com.uni.vendas.repository.ItemRepository;
import com.uni.vendas.validator.ItemValidator;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemService {

    private Logger logger = LoggerFactory.getLogger(ItemService.class.getName());
    private final ItemRepository itemRepository;
    private final ItemValidator itemValidator;

    public Optional<Item> findById(UUID id) {
        return itemRepository.findById(id);
    }

    public Item createItem(Item item) {
        itemValidator.validate(item);
        return itemRepository.save(item);
    }

    public void updateItem(Item item) {
        if (item.getId() == null) {
            throw new IllegalArgumentException("Item ID cannot be null for update operation");
        }
        itemRepository.save(item);
    }

    public void deleteItem(UUID id) {
        Optional<Item> itemOptional = itemRepository.findById(id);
        if (itemOptional.isPresent()) {
            itemRepository.delete(itemOptional.get());
        }
    }

    public List<Item> searchAuthorsByExample(String name) {
        var item = new Item();
        item.setName(name);

        ExampleMatcher matcher = ExampleMatcher
                .matching()
                .withIgnoreNullValues()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        Example<Item> authorExample = Example.of(item, matcher);

        return itemRepository.findAll(authorExample);

    }

}
