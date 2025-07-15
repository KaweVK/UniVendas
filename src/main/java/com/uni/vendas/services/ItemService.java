package com.uni.vendas.services;

import com.uni.vendas.data.dto.v1.ItemDTO;
import com.uni.vendas.mapper.ItemMapper;
import com.uni.vendas.models.Item;
import com.uni.vendas.repository.ItemRepository;
import com.uni.vendas.validator.ItemValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemValidator itemValidator;
    private final ItemMapper itemMapper;

    public Optional<ItemDTO> findById(String id) {
        UUID idItem = UUID.fromString(id);
        var itemOptional = itemRepository.findById(idItem);
        if (itemOptional.isEmpty()) {
            throw new IllegalArgumentException("Item with ID " + id + " does not exist");
        }
        return itemOptional.map(itemMapper::toDTO);
    }

    protected Optional<Item> findByIdInternal(String id) {
        Optional<Item> itemOptional = itemRepository.findById(UUID.fromString(id));
        if (itemOptional.isEmpty()) {
            throw new IllegalArgumentException("Item with ID " + id + " does not exist");
        }
        return itemOptional;
    }

    public Item createItem(ItemDTO itemDTO) {
        var item = itemDTO.MapToItem();
        itemValidator.validate(item);
        return itemRepository.save(item);
    }

    public Optional<ItemDTO> updateItem(String id, ItemDTO itemDTO) {
        Optional<Item> itemOptional = findByIdInternal(id);

        if (itemOptional.isEmpty()) {
            throw new IllegalArgumentException("Item with ID " + id + " does not exist");
        }

        Item item = itemOptional.get();

        if (item.getId() == null) {
            throw new IllegalArgumentException("Item ID cannot be null for update operation");
        }

        item.setName(itemDTO.name());
        item.setDescription(itemDTO.description());
        item.setAmount(itemDTO.amount());
        item.setPrice(itemDTO.price());

        itemValidator.validate(item);
        Item updated = itemRepository.save(item);
        return Optional.of(itemMapper.toDTO(updated));
    }

    public void deleteItem(String id) {
        var itemId = UUID.fromString(id);
        Optional<Item> itemOptional = itemRepository.findById(itemId);
        itemOptional.ifPresent(itemRepository::delete);
    }
}
