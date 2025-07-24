package com.uni.vendas.models;

import com.uni.vendas.models.enums.ItemCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "item")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Item {

    @Id
    @Column(name = "id", updatable = false, nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "name", nullable = false, length = 80)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "amount", nullable = false)
    private Long amount;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "category", nullable = false)
    @Enumerated(EnumType.STRING)
    private ItemCategory category;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_salesman")
    private User soldBy;
    @CreatedDate
    @Column(name = "register_date")
    private LocalDateTime registerDate;
    @LastModifiedDate
    @Column(name = "update_date")
    private LocalDateTime updateDate;
    @Column(name = "user_id")
    private UUID userId;
}
