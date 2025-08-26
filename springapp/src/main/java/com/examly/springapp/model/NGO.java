package com.examly.springapp.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class NGO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Size(max= 100)
    @NotBlank
    private String name;
    
    @Size(max= 500)
    private String description;

    @Email
    @NotBlank
    private String contactEmail;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String registrationNumber;

    private LocalDateTime createdAt = LocalDateTime.now();

}
