package com.uni.vendas.mapper;

import com.uni.vendas.data.dto.ItemDTO;
import com.uni.vendas.models.Item;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ItemMapper {

    Item toEntity(ItemDTO itemDTO);

    ItemDTO toDTO(Item item);

}
