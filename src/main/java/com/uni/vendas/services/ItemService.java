package com.uni.vendas.services;

import com.uni.vendas.data.dto.DefaultItemDTO;
import com.uni.vendas.data.dto.RegisterItemDTO;
import com.uni.vendas.mapper.ItemMapper;
import com.uni.vendas.models.Item;
import com.uni.vendas.repository.ItemRepository;
import com.uni.vendas.validator.ItemValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static com.uni.vendas.repository.specs.ItemSpecs.*;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemValidator itemValidator;
    private final ItemMapper itemMapper;

    public Optional<RegisterItemDTO> findById(String id) {
        UUID idItem = UUID.fromString(id);
        var itemOptional = itemRepository.findById(idItem);
        if (itemOptional.isEmpty()) {
            throw new IllegalArgumentException("Item with ID " + id + " does not exist");
        }
        return itemOptional.map(itemMapper::toRegisterDTO);
    }

    protected Optional<Item> findByIdInternal(String id) {
        Optional<Item> itemOptional = itemRepository.findById(UUID.fromString(id));
        if (itemOptional.isEmpty()) {
            throw new IllegalArgumentException("Item with ID " + id + " does not exist");
        }
        return itemOptional;
    }

    public Item createItem(RegisterItemDTO registerItemDTO) {
        var item = itemMapper.toEntity(registerItemDTO);
        itemValidator.validate(item);
        return itemRepository.save(item);
    }

    public Optional<RegisterItemDTO> updateItem(String id, RegisterItemDTO registerItemDTO) {
        Optional<Item> itemOptional = findByIdInternal(id);

        if (itemOptional.isEmpty()) {
            throw new IllegalArgumentException("Item with ID " + id + " does not exist");
        }

        Item item = itemOptional.get();

        if (item.getId() == null) {
            throw new IllegalArgumentException("Item ID cannot be null for update operation");
        }

        item.setName(registerItemDTO.name());
        item.setDescription(registerItemDTO.description());
        item.setAmount(registerItemDTO.amount());
        item.setPrice(registerItemDTO.price());

        itemValidator.validate(item);
        Item updated = itemRepository.save(item);
        return Optional.of(itemMapper.toRegisterDTO(updated));
    }

    public void deleteItem(String id) {
        var itemId = UUID.fromString(id);
        Optional<Item> itemOptional = itemRepository.findById(itemId);
        itemOptional.ifPresent(itemRepository::delete);
    }

    public Page<DefaultItemDTO> searchItem(String name, String description, Double priceLess, Double priceGreater, Integer page, Integer size, String userNameLike, String category) {

        Specification<Item> spec = Specification
                .where((root, query, cb) -> cb.conjunction());

        if (name != null && !name.isEmpty()) {
            spec = spec.and(nameLike(name));
        }
        if (description != null && !description.isEmpty()) {
            spec = spec.and(descriptionLike(description));
        }
        if (priceLess != null && priceGreater != null) {
            spec = spec.and(priceEqual(priceLess, priceGreater));
        }
        if (userNameLike != null && !userNameLike.isEmpty()) {
            spec = spec.and(userNameLike(userNameLike));
        }
        if (category != null && !category.isEmpty()) {
            spec = spec.and(categoryEqual(category));
        }

        Pageable pageable = PageRequest.of(page, size);

        Page<Item> result = itemRepository.findAll(spec, pageable);

        return result.map(itemMapper::toDefaultDTO);

    }

}
