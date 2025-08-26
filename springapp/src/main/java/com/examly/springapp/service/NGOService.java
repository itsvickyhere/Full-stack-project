package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.NGO;
import com.examly.springapp.repository.NGORepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class NGOService {
    @Autowired
    private NGORepository ngoRepository;

    // ✅ Pagination + Sorting
    public Page<NGO> getAllNGOs(Pageable pageable) {
        return ngoRepository.findAll(pageable);
    }

    public List<NGO> getAllNGOs() 
    {
        return ngoRepository.findAll();
    }

    // ✅ Create NGO
    public NGO createNGO(NGO ngo) {
        if (ngoRepository.existsByRegistrationNumber(ngo.getRegistrationNumber())) {
            throw new EntityExistsException("NGO with this registration number already exists");
        }
        return ngoRepository.save(ngo);
    }

    // ✅ Read NGO by ID
    public NGO getNGOById(Long id) {
        return ngoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("NGO not found with id " + id));
    }

    // ✅ Update NGO
    public NGO updateNGO(Long id, NGO ngoDetails) {
        NGO ngo = ngoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("NGO not found with id " + id));

        ngo.setName(ngoDetails.getName());
        ngo.setDescription(ngoDetails.getDescription());
        ngo.setContactEmail(ngoDetails.getContactEmail());
        ngo.setRegistrationNumber(ngoDetails.getRegistrationNumber());

        return ngoRepository.save(ngo);
    }

    // ✅ Delete NGO
    public void deleteNGO(Long id) {
        NGO ngo = ngoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("NGO not found with id " + id));
        ngoRepository.delete(ngo);
    }
}
