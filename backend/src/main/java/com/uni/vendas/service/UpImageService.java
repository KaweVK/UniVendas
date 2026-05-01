package com.uni.vendas.service;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class UpImageService {

    private final Cloudinary cloudinary;

    public UpImageService(@Value("${CLOUDINARY_URL}") String url) {
        this.cloudinary = new Cloudinary(url);
    }

    public String uploadImage(MultipartFile arquivo) {
        try {
            Map resultado = cloudinary.uploader().upload(arquivo.getBytes(), ObjectUtils.emptyMap());
            return (String) resultado.get("secure_url");
        } catch (IOException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Image error");
        }
    }

    public List<String> uploadImagens(List<MultipartFile> imagens) {
        if (imagens == null || imagens.isEmpty()) {
            return Collections.emptyList();
        }

        return imagens.stream()
                .filter(imagem -> imagem != null && !imagem.isEmpty())
                .map(this::uploadImage)
                .toList();
    }
}