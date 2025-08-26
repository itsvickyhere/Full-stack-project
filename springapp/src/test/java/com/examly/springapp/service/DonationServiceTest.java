package com.examly.springapp.service;

import com.examly.springapp.model.Donation;
import com.examly.springapp.model.Cause;
import com.examly.springapp.repository.DonationRepository;
import com.examly.springapp.repository.CauseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.dao.DataIntegrityViolationException;
import jakarta.persistence.EntityNotFoundException;
import java.util.Collections;

class DonationServiceTest {
    private DonationService donationService;
    private DonationRepository donationRepository;
    private CauseRepository causeRepository;

    @BeforeEach
    void setUp() {
        donationRepository = Mockito.mock(DonationRepository.class);
        causeRepository = Mockito.mock(CauseRepository.class);
        donationService = new DonationService(donationRepository, causeRepository);
    }

    @Test
    void service_makeDonationValid() {
        Donation d = new Donation();
        d.setAmount(new BigDecimal("50.0"));
        d.setDonorName("Alice");
        d.setIsAnonymous(false);
        Cause c = new Cause();
        c.setId(2L);
        c.setCurrentAmount(new BigDecimal("100.0"));
        c.setIsActive(true);
        c.setEndDate(LocalDate.now().plusDays(5));
        Mockito.when(causeRepository.findById(2L)).thenReturn(Optional.of(c));
        Mockito.when(donationRepository.save(Mockito.any(Donation.class))).thenReturn(d);
        Mockito.when(causeRepository.save(Mockito.any(Cause.class))).thenReturn(c);
        Donation saved = donationService.makeDonation(d, 2L);
        assertEquals("Alice", saved.getDonorName());
    }

    @Test
    void service_makeDonationToInactiveCauseFails() {
        Donation d = new Donation();
        d.setAmount(new BigDecimal("20.0"));
        d.setDonorName("Bob");
        Cause c = new Cause();
        c.setId(7L);
        c.setIsActive(false);
        c.setEndDate(LocalDate.now().plusDays(1));
        Mockito.when(causeRepository.findById(7L)).thenReturn(Optional.of(c));
        assertThrows(DataIntegrityViolationException.class, () -> donationService.makeDonation(d, 7L));
    }

    @Test
    void service_getDonationsByCauseIdNotFound() {
        Mockito.when(causeRepository.findById(3L)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> donationService.getDonationsByCauseId(3L));
    }
}
