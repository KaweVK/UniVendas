package com.uni.vendas.user.mapper;

import com.uni.vendas.user.dto.DefaultUserDTO;
import com.uni.vendas.user.dto.RegisterUserDTO;
import com.uni.vendas.user.models.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(RegisterUserDTO userDTO);

    RegisterUserDTO toRegisterDTO(User user);

    DefaultUserDTO toDefaultDTO(User user);
}
