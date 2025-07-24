package com.uni.vendas.mapper;

import com.uni.vendas.data.dto.ItemDTO;
import com.uni.vendas.models.Item;
import com.uni.vendas.repository.UserRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public abstract class ItemMapper {

    @Autowired
    UserRepository userRepository;

    @Mapping(target = "soldBy", expression = "java( userRepository.findById(itemDTO.soldById()).orElse(null) )")
    public abstract Item toEntity(ItemDTO itemDTO);

    public abstract ItemDTO toDTO(Item item);

}
