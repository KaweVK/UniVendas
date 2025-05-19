package com.uni.vendas.data.dto.v1;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.hateoas.RepresentationModel;

import java.util.Objects;

@JsonPropertyOrder({"id", "name", "description", "amount", "price"})
public class ItemDTO extends RepresentationModel<ItemDTO> {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String name;
    private String description;
    private Long amount;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private double price;

    public ItemDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ItemDTO itemDTO = (ItemDTO) o;
        return Double.compare(getPrice(), itemDTO.getPrice()) == 0 && Objects.equals(getId(), itemDTO.getId()) && Objects.equals(getName(), itemDTO.getName()) && Objects.equals(getDescription(), itemDTO.getDescription()) && Objects.equals(getAmount(), itemDTO.getAmount());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getId(), getName(), getDescription(), getAmount(), getPrice());
    }
}
