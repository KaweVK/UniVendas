package com.uni.vendas.user.validator;

import com.uni.vendas.infra.exception.DuplicatedRegisterException;
import com.uni.vendas.user.models.User;
import com.uni.vendas.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserValidator {

    private final UserRepository userRepository;

    public void validate(User user){
        if(existItem(user)){
            throw new DuplicatedRegisterException("User alredy exists");
        }
    }

    private boolean existItem(User user) {
        Optional<User> userFinded = userRepository.findByEmail(user.getEmail());

        if (user.getId() == null) {
            return userFinded.isPresent();
        }

        return userFinded.isPresent() && !user.getId().equals(userFinded.get().getId());
    }

}
