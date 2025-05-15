package com.uni.vendas.controllers;


import com.uni.vendas.data.dto.UserDTO;
import com.uni.vendas.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/users")
public class UserController {

    @Autowired
    private UserServices userServices;

    @GetMapping("/{id}")
    public UserDTO findById(@PathVariable("id") Long id) {
        var person = userServices.findById(id);

        return person;
    }

    @GetMapping()
    public List<UserDTO> findAll() {
        var persons = userServices.findAll();

        return persons;
    }


    public UserDTO createPerson(UserDTO dto) {

    }

    public Class<?> deletePerson(Long id) {
    }

    public Class<?> updatePerson(UserDTO dto) {
        return null;
    }
}
