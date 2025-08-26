package com.examly.springapp.controller;

import com.examly.springapp.model.Cause;
import com.examly.springapp.service.CauseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/causes")
public class CauseController {

    @Autowired
    private CauseService causeService;

    @PostMapping
    public ResponseEntity<?> createCause(@RequestBody Map<String, Object> body) {
        Cause cause = new Cause();
        cause.setTitle((String) body.get("title"));
        cause.setDescription((String) body.get("description"));
        cause.setTargetAmount(new BigDecimal(body.get("targetAmount").toString()));
        cause.setStartDate(LocalDate.parse((String) body.get("startDate")));
        cause.setEndDate(LocalDate.parse((String) body.get("endDate")));
        return ResponseEntity.status(201)
                .body(causeService.createCause(cause, Long.valueOf(body.get("ngoId").toString())));
    }

    @GetMapping("/active")
    public List<Cause> getAllActiveCauses() {
        return causeService.getAllActiveCauses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCauseById(@PathVariable Long id) {
        return ResponseEntity.ok(causeService.getCauseById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCause(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Cause updatedCause = causeService.updateCause(id, body);
        return ResponseEntity.ok(updatedCause);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCause(@PathVariable Long id) {
        causeService.deleteCause(id);
        return ResponseEntity.noContent().build();
    }
}