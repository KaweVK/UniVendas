package com.uni.vendas.validator;

import com.uni.vendas.infra.exception.DuplicatedRegisterException;
import com.uni.vendas.model.Seller;
import com.uni.vendas.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SellerValidator {

    private final SellerRepository sellerRepository;

    public void validate(Seller seller){
        if(existSeller(seller)){
            throw new DuplicatedRegisterException("User alredy exists");
        }
    }

    private boolean existSeller(Seller seller) {
        Optional<Seller> userFinded = sellerRepository.findByEmail(seller.getEmail());

        if (seller.getId() == null) {
            return userFinded.isPresent();
        }

        return userFinded.isPresent() && !seller.getId().equals(userFinded.get().getId());
    }

}
