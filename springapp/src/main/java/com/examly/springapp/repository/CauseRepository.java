package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Cause;

@Repository
public interface CauseRepository extends JpaRepository<Cause, Long>
{
    
}
