package com.uni.vendas.controllers;

import com.uni.vendas.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shop/v1")
public class ItemController {

    @Autowired
    private ItemService itemService;



}
