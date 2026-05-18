package com.uni.vendas.service;

import com.uni.vendas.dto.ResponseItemDTO;
import com.uni.vendas.dto.RegisterItemDTO;
import com.uni.vendas.infra.exception.OperationNotAllowedException;
import com.uni.vendas.mapper.ItemMapper;
import com.uni.vendas.model.Item;
import com.uni.vendas.model.Seller;
import com.uni.vendas.model.enums.ItemAvailability;
import com.uni.vendas.repository.ItemRepository;
import com.uni.vendas.validator.ItemValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import static com.uni.vendas.repository.specs.ItemSpecs.*;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemValidator itemValidator;
    private final ItemMapper itemMapper;
    private final UpImageService upImageService;

    public ResponseItemDTO findById(String id) {
        UUID idItem = UUID.fromString(id);
        return itemRepository.findById(idItem)
                .map(itemMapper::toDefaultDTO)
                .orElseThrow(() -> new NoSuchElementException("Item com ID " + id + " não existe"));
    }

    public Page<ResponseItemDTO> findAll(Integer page, Integer size) {
        return itemRepository.findAll(PageRequest.of(page, size))
                .map(itemMapper::toDefaultDTO);
    }

    protected Item findByIdInternal(String id) {
        return itemRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new NoSuchElementException("Item com ID " + id + " não existe"));
    }

    public Item createItem(RegisterItemDTO registerItemDTO, Seller current) {
        var item = itemMapper.toEntity(registerItemDTO);
        item.setSoldBy(current);
        item.setImages(upImageService.uploadImagens(registerItemDTO.images()));
        itemValidator.validate(item);
        return itemRepository.save(item);
    }

    public ResponseItemDTO updateItem(String id, RegisterItemDTO registerItemDTO, Seller current) {
        Item item = findByIdInternal(id);

        if (!item.getSoldBy().getId().equals(current.getId()))
            throw new OperationNotAllowedException("Sem permissão");

        if (item.getId() == null) {
            throw new IllegalArgumentException("Item ID cannot be null for update operation");
        }

        item.setName(registerItemDTO.name());
        item.setDescription(registerItemDTO.description());
        item.setAmount(registerItemDTO.amount());
        item.setPrice(registerItemDTO.price());
        item.setCategory(registerItemDTO.category());
        item.setImages(mergeImagens(item.getImages(), registerItemDTO.imagensMantidas(), registerItemDTO.images()));

        itemValidator.validate(item);
        Item updated = itemRepository.save(item);
        return (itemMapper.toDefaultDTO(updated));
    }

    public void deleteItem(String id, Seller current) {
        Item item = findByIdInternal(id);

        if (!item.getSoldBy().getId().equals(current.getId()))
            throw new OperationNotAllowedException("Sem permissão");

        itemRepository.delete(item);
    }

    public Page<ResponseItemDTO> searchItem(String name, String description, Double priceLess, Double priceGreater, Integer page, Integer size, String category, String availability) {

        Specification<Item> spec = Specification
                .where((root, query, cb) -> cb.conjunction());

        if (name != null && !name.isEmpty()) {
            spec = spec.and(nameLike(name));
        }
        if (description != null && !description.isEmpty()) {
            spec = spec.and(descriptionLike(description));
        }
        if (priceGreater != null) {
            spec = spec.and(priceGreaterOrEqual(priceGreater));
        }
        if (priceLess != null) {
            spec = spec.and(priceLessOrEqual(priceLess));
        }
        if (category != null && !category.isEmpty()) {
            spec = spec.and(categoryEqual(category.toUpperCase()));
        }
        if (availability != null && !availability.isEmpty()) {
            spec = spec.and(availabilityEqual(ItemAvailability.valueOf(availability.toUpperCase())));
        }

        Pageable pageable = PageRequest.of(page, size);

        Page<Item> result = itemRepository.findAll(spec, pageable);

        return result.map(itemMapper::toDefaultDTO);

    }

    private List<String> mergeImagens(List<String> atuais, List<String> mantidas, List<MultipartFile> novas
    ) {
        List<String> resultado = new ArrayList<>();

        if (mantidas != null && !mantidas.isEmpty()) {
            List<String> base = atuais != null ? atuais : Collections.emptyList();
            mantidas.stream().filter(base::contains).forEach(resultado::add);
        }

        resultado.addAll(upImageService.uploadImagens(novas));
        return resultado;
    }
}
