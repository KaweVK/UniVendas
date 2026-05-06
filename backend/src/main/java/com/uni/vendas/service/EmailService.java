package com.uni.vendas.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void enviarCodigoVerificacao(String destinatario, String codigo, String tipo) {
        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setTo(destinatario);

        if ("REGISTRATION".equals(tipo)) {
            mensagem.setSubject("UniVendas — Código de verificação");
            mensagem.setText(
                    "Olá!\n\n" +
                            "Seu código de verificação para criar a conta no UniVendas é:\n\n" +
                            "  " + codigo + "\n\n" +
                            "O código expira em 15 minutos.\n" +
                            "Se você não solicitou isso, ignore este email."
            );
        } else {
            mensagem.setSubject("UniVendas — Redefinição de senha");
            mensagem.setText(
                    "Olá!\n\n" +
                            "Seu código para redefinir a senha no UniVendas é:\n\n" +
                            "  " + codigo + "\n\n" +
                            "O código expira em 15 minutos.\n" +
                            "Se você não solicitou isso, ignore este email."
            );
        }

        mailSender.send(mensagem);
    }
}