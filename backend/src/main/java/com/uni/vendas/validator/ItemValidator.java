package com.uni.vendas.validator;

import com.uni.vendas.infra.exception.DuplicatedRegisterException;
import com.uni.vendas.model.Item;
import com.uni.vendas.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ItemValidator {

    private final ItemRepository itemRepository;

    public void validate(Item item){
        if(existItem(item)){
            throw new DuplicatedRegisterException("Item alredy exists");
        }
    }

    private boolean existItem(Item item) {
        if (item.getId() == null) {
            return itemRepository
                    .findByNameAndDescriptionAndAmountAndPrice(
                            item.getName(), item.getDescription(), item.getAmount(), item.getPrice())
                    .isPresent();
        }
        return itemRepository
                .findByNameAndDescriptionAndAmountAndPrice(
                        item.getName(), item.getDescription(), item.getAmount(), item.getPrice())
                .filter(found -> !found.getId().equals(item.getId()))
                .isPresent();
    }

}
