package com.uni.vendas.validator;

import com.uni.vendas.exception.DuplicatedRegisterException;
import com.uni.vendas.models.User;
import com.uni.vendas.repository.UserRepository;
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
