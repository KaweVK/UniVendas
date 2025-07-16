package com.uni.vendas.mapper;

import com.uni.vendas.data.dto.DeafultUserDTO;
import com.uni.vendas.data.dto.RegisterUserDTO;
import com.uni.vendas.models.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(RegisterUserDTO userDTO);

    RegisterUserDTO toRegisterDTO(User user);

    DeafultUserDTO toDefaultDTO(User user);
}
