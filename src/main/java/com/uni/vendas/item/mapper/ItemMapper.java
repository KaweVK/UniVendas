package com.uni.vendas.item.mapper;

import com.uni.vendas.user.dto.DefaultItemDTO;
import com.uni.vendas.item.data.RegisterItemDTO;
import com.uni.vendas.user.mapper.UserMapper;
import com.uni.vendas.item.model.Item;
import com.uni.vendas.user.repository.UserRepository;
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
