package com.uni.vendas.service;

import com.uni.vendas.dto.RegisterSellerDTO;
import com.uni.vendas.dto.ResponseSellerDTO;
import com.uni.vendas.model.Seller;
import com.uni.vendas.repository.SellerRepository;
import com.uni.vendas.mapper.SellerMapper;
import com.uni.vendas.validator.SellerValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

import static com.uni.vendas.repository.specs.SellerSpecs.*;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final SellerMapper sellerMapper;
    private final SellerRepository sellerRepository;
    private final SellerValidator sellerValidator;
    private final PasswordEncoder passwordEncoder;
    private final UpImageService upImageService;

    public Optional<ResponseSellerDTO> findById(String id) {
        UUID uuid = UUID.fromString(id);
        var userOptional = sellerRepository.findById(uuid);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
        return userOptional.map(sellerMapper::toDefaultDTO);
    }

    protected Optional<Seller> findByIdInternal(String id) {
        Optional<Seller> userOptional = sellerRepository.findById(UUID.fromString(id));
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
        return userOptional;
    }

    public Seller createUser(RegisterSellerDTO userDTO) {
        var user = sellerMapper.toEntity(userDTO);

        if (userDTO.image() != null && !userDTO.image().isEmpty()) {
            String url = upImageService.uploadImage(userDTO.image());

            user.setImage(url);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        sellerValidator.validate(user);
        return sellerRepository.save(user);

    }

    public Optional<ResponseSellerDTO> updateUser(String id, RegisterSellerDTO userDTO ) {
        Optional<Seller> userOptional = findByIdInternal(id);

        if (userOptional.isEmpty()) {
            return Optional.empty();
        }

        Seller seller = userOptional.get();

        if (seller.getId() == null) {
            throw new IllegalArgumentException("Item ID cannot be null for update operation");
        }

        seller.setName(userDTO.name());
        seller.setEmail(userDTO.email());
        seller.setPhoneNumber(userDTO.phoneNumber());
        seller.setCity(userDTO.city());
        seller.setPassword(passwordEncoder.encode(userDTO.password()));
        if (userDTO.image() != null && !userDTO.image().isEmpty()) {
            String url = upImageService.uploadImage(userDTO.image());

            seller.setImage(url);
        }
        sellerValidator.validate(seller);

        var updatedUser = sellerRepository.save(seller);
        return Optional.of(sellerMapper.toDefaultDTO(updatedUser));
    }

    public void deleteUser(String id) {
        UUID uuid = UUID.fromString(id);
        Optional<Seller> userOptional = sellerRepository.findById(uuid);
        userOptional.ifPresent(sellerRepository::delete);
    }

    public Page<ResponseSellerDTO> search(String name, String email, String phoneNumber, Integer page, Integer size) {
        Specification<Seller> spec = Specification
                .where((root, query, cb) -> cb.conjunction());

        if (name != null && !name.isEmpty()) {
            spec = spec.and(nameLike(name));
        }
        if (email != null && !email.isEmpty()) {
            spec = spec.and(emailLike(email));
        }
        if (phoneNumber != null && !phoneNumber.isEmpty()) {
            spec = spec.and(phoneNumberLike(phoneNumber));
        }

        Pageable pageable = PageRequest.of(page, size);

        Page<Seller> result = sellerRepository.findAll(spec, pageable);

        return result.map(sellerMapper::toDefaultDTO);
    }

}
