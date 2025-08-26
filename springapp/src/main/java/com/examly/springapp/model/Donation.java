package com.examly.springapp.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Positive
    private BigDecimal amount;

    @NotBlank
    private String donorName;
    @NotBlank
    @Email
    private String donorEmail;

    @NotBlank
    @Size(max = 200)
    private String message;

    private boolean isAnonymous = false;

    public void setIsAnonymous(boolean isAnonymous)
    {
        this.isAnonymous = isAnonymous;
    }

    private LocalDateTime donationDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "cause_id" , nullable = false)
    @JsonIgnore
    private Cause cause;
}
