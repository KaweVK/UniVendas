package com.uni.vendas.mapper;

import com.uni.vendas.data.dto.DefaultItemDTO;
import com.uni.vendas.data.dto.RegisterItemDTO;
import com.uni.vendas.models.Item;
import com.uni.vendas.repository.UserRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public abstract class ItemMapper {

    @Autowired
    UserRepository userRepository;

    @Mapping(target = "soldBy", expression = "java( userRepository.findById(registerItemDTO.soldById()).orElse(null) )")
    public abstract Item toEntity(RegisterItemDTO registerItemDTO);

    public abstract RegisterItemDTO toRegisterDTO(Item item);

    public abstract DefaultItemDTO toDefaultDTO(Item item);

}
