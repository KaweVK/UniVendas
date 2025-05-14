package com.uni.vendas.controllers;

import com.uni.vendas.services.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vendas/v1")
public class ShopController {

    @Autowired
    private ShopService shopService;

}
