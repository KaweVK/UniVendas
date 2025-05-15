package com.uni.vendas.services;

import com.uni.vendas.models.User;
import com.uni.vendas.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private Logger logger = LoggerFactory.getLogger(UserServices.class.getName());

    @Autowired
    private UserRepository repository;


    public List<User> findAll() {


        return repository.findAll();
    }

}
