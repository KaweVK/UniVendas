package com.uni.vendas.mapper;

import com.uni.vendas.dto.ResponseItemDTO;
import com.uni.vendas.dto.RegisterItemDTO;
import com.uni.vendas.model.Item;
import com.uni.vendas.repository.SellerRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.NoSuchElementException;

@Mapper(componentModel = "spring")
public abstract class ItemMapper {

    @Mapping(target = "images", ignore = true)
    public abstract Item toEntity(RegisterItemDTO registerItemDTO);

    @Mapping(target = "images", ignore = true)
    public abstract RegisterItemDTO toRegisterDTO(Item item);

    public abstract ResponseItemDTO toDefaultDTO(Item item);

}
