package com.examly.springapp.controller;

import com.examly.springapp.model.NGO;
import com.examly.springapp.service.NGOService;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ngos")
public class NGOController {

    @Autowired
    private NGOService ngoService;

    @PostMapping
    public ResponseEntity<?> createNGO(@RequestBody Map<String, Object> body) {
        NGO ngo = new NGO();
        ngo.setName((String) body.get("name"));
        ngo.setContactEmail((String) body.get("contactEmail"));
        ngo.setRegistrationNumber((String) body.get("registrationNumber"));
        return ResponseEntity.status(201).body(ngoService.createNGO(ngo));
    }

    @GetMapping
    public List<NGO> getAllNGOs() {
        return ngoService.getAllNGOs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNGOById(@PathVariable Long id) {
        return ResponseEntity.ok(ngoService.getNGOById(id));
    }

    // ✅ Update NGO
    @PutMapping("/{id}")
    public ResponseEntity<NGO> updateNGO(@PathVariable Long id, @RequestBody NGO ngoDetails) {
        return ResponseEntity.ok(ngoService.updateNGO(id, ngoDetails));
    }

    // ✅ Delete NGO
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNGO(@PathVariable Long id) {
        ngoService.deleteNGO(id);
        return ResponseEntity.ok("NGO deleted successfully");
    }
}

