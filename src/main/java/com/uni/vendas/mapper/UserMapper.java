package com.uni.vendas.mapper;

import com.uni.vendas.data.dto.DefaultUserDTO;
import com.uni.vendas.data.dto.RegisterUserDTO;
import com.uni.vendas.models.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(RegisterUserDTO userDTO);

    RegisterUserDTO toRegisterDTO(User user);

    DefaultUserDTO toDefaultDTO(User user);
}
