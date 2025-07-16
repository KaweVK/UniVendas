package com.uni.vendas.services;

import com.uni.vendas.data.dto.DeafultUserDTO;
import com.uni.vendas.data.dto.RegisterUserDTO;
import com.uni.vendas.mapper.UserMapper;
import com.uni.vendas.models.User;
import com.uni.vendas.repository.UserRepository;
import com.uni.vendas.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final UserValidator userValidator;

    public Optional<DeafultUserDTO> findById(String id) {
        var uuid = UUID.fromString(id);
        var userOptional = userRepository.findById(uuid);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
        return userOptional.map(userMapper::toDefaultDTO);
    }

    protected Optional<User> findByIdInternal(String id) {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(id));
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
        return userOptional;
    }

    public User createUser(RegisterUserDTO userDTO) {
        var user = userMapper.toEntity(userDTO);
        userValidator.validate(user);
        return userRepository.save(user);

    }

    public Optional<DeafultUserDTO> updateUser(String id, RegisterUserDTO userDTO ) {
        Optional<User> userOptional = findByIdInternal(id);

        if (userOptional.isEmpty()) {
            return Optional.empty();
        }

        User user = userOptional.get();

        if (user.getId() == null) {
            throw new IllegalArgumentException("Item ID cannot be null for update operation");
        }

        user.setName(userDTO.name());
        user.setEmail(userDTO.email());
        user.setPhoneNumber(userDTO.phoneNumber());
        user.setCity(userDTO.city());
        user.setPassword(userDTO.password());
        userValidator.validate(user);

        var updatedUser = userRepository.save(user);
        return Optional.of(userMapper.toDefaultDTO(updatedUser));
    }

    public void deleteUser(String id) {
        UUID uuid = UUID.fromString(id);
        Optional<User> userOptional = userRepository.findById(uuid);
        userOptional.ifPresent(userRepository::delete);
    }
}
