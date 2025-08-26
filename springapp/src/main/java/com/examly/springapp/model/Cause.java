package com.examly.springapp.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cause {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String title;
    
    @Size(max = 100)
    private String description;

    @NotNull
    @Positive
    private BigDecimal targetAmount;
    private BigDecimal currentAmount = BigDecimal.ZERO;

    @NotNull
    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;
    private boolean isActive = true;

    public void setIsActive(boolean isActive)
    {
        this.isActive = isActive;
    }

    @ManyToOne
    @JoinColumn(name = "ngo_id",nullable = false)
    @JsonIgnore
    private NGO ngoId;
    
    @OneToMany(mappedBy = "cause")
    @JsonIgnore
    private List<Donation> donations;

     @JsonProperty("ngoId")
         public Long getNgoIdValue() {
                    return this.ngoId != null ? this.ngoId.getId() : null;
                        }
}

