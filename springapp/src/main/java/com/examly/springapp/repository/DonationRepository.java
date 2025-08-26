package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Donation;

@Repository
public interface DonationRepository extends JpaRepository<Donation,Long>
{
    List<Donation> findByCauseId(Long id);
}
