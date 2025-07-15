package com.uni.vendas.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user", schema = "public")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @Column(name = "id", updatable = false, nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "name", nullable = false, length = 100)
    private String name;
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@dcx.ufpb.br$", message = "Invalid email format")
    @Column(name = "name", nullable = false, length = 100)
    private String email;
    @Column(name = "password", nullable = false, length = 50)
    private String password;
    @Column(name = "phone_number", nullable = false, length = 15)
    private String phoneNumber;
    @Column(name = "city", nullable = false, length = 50)
    private String city;
//    @OneToMany(mappedBy = "", fetch = FetchType.LAZY)
//    private List<Item> createdItems;

    @CreatedDate
    @Column(name = "register_date")
    private LocalDateTime registerDate;
    @Column(name = "update_date")
    private LocalDateTime updateDate;
    @Column(name = "user_id")
    private UUID userId;

}
