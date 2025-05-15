package com.uni.vendas.services;

import com.uni.vendas.controllers.UserController;
import com.uni.vendas.data.dto.UserDTO;
import com.uni.vendas.exceptions.RequiredObjectIsNullException;
import com.uni.vendas.exceptions.ResourceNotFoundException;
import com.uni.vendas.models.User;
import com.uni.vendas.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.uni.vendas.mapper.DozerObjectMapper.parseListObjects;
import static com.uni.vendas.mapper.DozerObjectMapper.parseObject;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class UserServices {

    private Logger logger = LoggerFactory.getLogger(UserServices.class.getName());

    @Autowired
    private UserRepository repository;

    public List<UserDTO> findAll() {
        logger.info("Finding all users");
        var users = parseListObjects(repository.findAll(), UserDTO.class);
        logger.info("Found {} users", users.size());

        users.forEach(this::addHateoasLinks);

        return users;
    }

    public UserDTO findById(Long id) {
        logger.info("Finding user");
        var user = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person not found for this id: " + id));
        logger.info("User found");

        var userDTO = parseObject(user, UserDTO.class);
        addHateoasLinks(userDTO);

        return userDTO;
    }

    public UserDTO createUser(UserDTO userDTO) {
        logger.info("Creating user");
        var user = parseObject(userDTO, User.class);

        var dto = parseObject(repository.save(user), UserDTO.class);
        logger.info("Created user");

        addHateoasLinks(dto);

        return dto;
    }

    public UserDTO updateUser(UserDTO userDTO) {
        logger.info("Updating user");
        var oldUser = repository.findById(userDTO.getId()).orElseThrow(() -> new ResourceNotFoundException("Person not found for this id: " + userDTO.getId()));
        logger.info("user found");

        oldUser.setFirstName(userDTO.getFirstName());
        oldUser.setLastName(userDTO.getLastName());
        oldUser.setEmail(userDTO.getEmail());
        oldUser.setPassword(userDTO.getPassword());
        oldUser.setPhone(userDTO.getPhone());
        oldUser.setCity(userDTO.getCity());

        var dto = parseObject(repository.save(oldUser), UserDTO.class);

        addHateoasLinks(dto);
        return dto;
    }

    public void deleteUser(Long id) {
        logger.info("Deleting user");

        var user = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person not found for this id: " + id));

        repository.delete(user);

        logger.info("Deleted user");
    }

    private UserDTO addHateoasLinks(UserDTO dto) {
        dto.add(linkTo(methodOn(UserController.class).findById(dto.getId())).withSelfRel().withType("GET"));
        dto.add(linkTo(methodOn(UserController.class).findAll()).withRel("findAll").withType("GET"));
        dto.add(linkTo(methodOn(UserController.class).createPerson(dto)).withRel("create").withType("POST"));
        dto.add(linkTo(methodOn(UserController.class).deletePerson(dto.getId())).withRel("delete").withType("DELETE"));
        dto.add(linkTo(methodOn(UserController.class).updatePerson(dto)).withRel("update").withType("PUT"));

        return dto;
    }

}
