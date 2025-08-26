package com.examly.springapp.service;

import com.examly.springapp.model.Cause;
import com.examly.springapp.model.NGO;
import com.examly.springapp.repository.CauseRepository;
import com.examly.springapp.repository.NGORepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.dao.DataIntegrityViolationException;
import jakarta.persistence.EntityNotFoundException;

class CauseServiceTest {
    private CauseService causeService;
    private CauseRepository causeRepository;
    private NGORepository ngoRepository;

    @BeforeEach
    void setUp() {
        causeRepository = Mockito.mock(CauseRepository.class);
        ngoRepository = Mockito.mock(NGORepository.class);
        causeService = new CauseService(causeRepository, ngoRepository);
    }

    @Test
    void service_createCauseValid() {
        Cause cause = new Cause();
        cause.setTitle("Clean Water");
        cause.setDescription("desc");
        cause.setTargetAmount(new BigDecimal("100.50"));
        cause.setStartDate(LocalDate.now());
        cause.setEndDate(LocalDate.now().plusDays(10));
        NGO ngo = new NGO();
        ngo.setId(10L);
        Mockito.when(ngoRepository.findById(10L)).thenReturn(Optional.of(ngo));
        Mockito.when(causeRepository.save(Mockito.any(Cause.class))).thenReturn(cause);
        Cause created = causeService.createCause(cause, 10L);
        assertEquals("Clean Water", created.getTitle());
    }

    @Test
    void service_createCauseEndDateBeforeStartFails() {
        Cause c = new Cause();
        c.setTargetAmount(new BigDecimal("20.0"));
        c.setStartDate(LocalDate.now());
        c.setEndDate(LocalDate.now().minusDays(1));
        assertThrows(DataIntegrityViolationException.class, () -> causeService.createCause(c, 1L));
    }

    @Test
    void service_createCauseNGONotFound() {
        Cause c = new Cause();
        c.setTargetAmount(new BigDecimal("50.0"));
        c.setStartDate(LocalDate.now());
        c.setEndDate(LocalDate.now().plusDays(1));
        Mockito.when(ngoRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> causeService.createCause(c, 1L));
    }
}
