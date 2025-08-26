package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.NGO;

@Repository
public interface NGORepository extends JpaRepository<NGO , Long>
{
    boolean existsByRegistrationNumber(String registrationNumber);
    Optional<NGO> findByRegistrationNumber(String registrationNumber);
}
