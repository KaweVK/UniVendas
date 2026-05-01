package com.uni.vendas.mapper;

import com.uni.vendas.dto.RegisterSellerDTO;
import com.uni.vendas.dto.ResponseSellerDTO;
import com.uni.vendas.model.Seller;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SellerMapper {

    @Mapping(target = "image", ignore = true)
    Seller toEntity(RegisterSellerDTO userDTO);

    @Mapping(target = "image", ignore = true)
    RegisterSellerDTO toRegisterDTO(Seller seller);

    ResponseSellerDTO toDefaultDTO(Seller seller);
}
