package com.uni.vendas.validator;

import com.uni.vendas.exception.DuplicatedRegisterException;
import com.uni.vendas.models.Item;
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
        Optional<Item> itemFinded = itemRepository.findByIdAndNameAndDescriptionAndAmountAndPrice(item.getId(), item.getName(), item.getDescription(), item.getAmount(), item.getPrice());

        if (item.getId() == null) {
            return itemFinded.isPresent();
        }

        return itemFinded.isPresent() && !item.getId().equals(itemFinded.get().getId());
    }

}
