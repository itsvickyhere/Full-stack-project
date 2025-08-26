package com.examly.springapp.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Cause;
import com.examly.springapp.model.NGO;
import com.examly.springapp.repository.CauseRepository;
import com.examly.springapp.repository.NGORepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CauseService {
    @Autowired
    private CauseRepository causeRepository;
    @Autowired
    private NGORepository ngoRepository;

    public CauseService(CauseRepository causeRepository, NGORepository ngoRepository) {
        this.causeRepository = causeRepository;
        this.ngoRepository = ngoRepository;
    }

    public List<Cause> getAllActiveCauses() {
        return causeRepository.findAll();
    }

    public Cause createCause(Cause cause, Long id) {
        if (cause.getEndDate().isBefore(cause.getStartDate())) {
            throw new DataIntegrityViolationException("End date cannot be before start date");
        }
        NGO ngo = ngoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("NGO not found"));
        cause.setNgoId(ngo);

        causeRepository.save(cause);
        return cause;
    }
    
    public Cause updateCause(Long id, Map<String, Object> body) {
        Cause cause = causeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cause not found"));

        if (body.containsKey("title")) {
            cause.setTitle((String) body.get("title"));
        }
        if (body.containsKey("description")) {
            cause.setDescription((String) body.get("description"));
        }
        if (body.containsKey("targetAmount")) {
            cause.setTargetAmount(new BigDecimal(body.get("targetAmount").toString()));
        }
        if (body.containsKey("startDate")) {
            cause.setStartDate(LocalDate.parse((String) body.get("startDate")));
        }
        if (body.containsKey("endDate")) {
            LocalDate endDate = LocalDate.parse((String) body.get("endDate"));
            if (endDate.isBefore(cause.getStartDate())) {
                throw new DataIntegrityViolationException("End date cannot be before start date");
            }
            cause.setEndDate(endDate);
        }

        return causeRepository.save(cause);
    }

    public void deleteCause(Long id) {
        Cause cause = causeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cause not found"));
        causeRepository.delete(cause);
    }

    public Cause getCauseById(Long id) {
        return causeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cause not found"));
    }
}
