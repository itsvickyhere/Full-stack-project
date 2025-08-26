package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Cause;
import com.examly.springapp.model.Donation;
import com.examly.springapp.repository.CauseRepository;
import com.examly.springapp.repository.DonationRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private CauseRepository causeRepository;

    public DonationService(DonationRepository donationRepository, CauseRepository causeRepository) {
        this.donationRepository = donationRepository;
        this.causeRepository = causeRepository;
    }

    public List<Donation> getDonationsByCauseId(Long id) 
    {
        causeRepository.findById(id).orElseThrow(() ->
         new EntityNotFoundException("Cause id not found")
        );

        return donationRepository.findByCauseId(id);
    }

    public Donation makeDonation(Donation donation, Long causeId) {
        Cause cause = causeRepository.findById(causeId)
                .orElseThrow(() -> new EntityNotFoundException("Cause not found"));
        if (!Boolean.TRUE.equals(cause.isActive())) {
            throw new DataIntegrityViolationException("Cannot donate to inactive cause");
        }
        donation.setCause(cause);
        cause.setCurrentAmount(cause.getCurrentAmount().add(donation.getAmount()));
        return donationRepository.save(donation);
    }
}
// package com.examly.springapp.service;

// import java.util.List;
// import java.util.Optional;
// import java.util.stream.Collectors;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.dao.DataIntegrityViolationException;
// import org.springframework.stereotype.Service;

// import com.examly.springapp.model.Cause;
// import com.examly.springapp.model.Donation;
// import com.examly.springapp.repository.CauseRepository;
// import com.examly.springapp.repository.DonationRepository;

// import jakarta.persistence.EntityNotFoundException;

// @Service
// public class DonationService {
//     @Autowired
//     private DonationRepository donationRepository;

//     @Autowired
//     private CauseRepository causeRepository;

//     public DonationService(DonationRepository donationRepository, CauseRepository causeRepository) 
//     {
//                 this.donationRepository = donationRepository;
//                 this.causeRepository = causeRepository;
//             }

//             public List<Donation> getDonationsByCauseId(Long id) 
//                 {
//                     causeRepository.findById(id).orElseThrow(() ->
//                      new EntityNotFoundException("Cause id not found")
//                     );
            
//                     return donationRepository.findByCauseId(id);
//                 }
//     public List<Donation> getAllDonations() {
//         return donationRepository.findAll();
//     }

//     public List<Donation> getDonationsByDonorEmail(String email) {
//         return donationRepository.findAll().stream()
//                 .filter(d -> d.getDonorEmail() != null && d.getDonorEmail().equalsIgnoreCase(email))
//                 .collect(Collectors.toList());
//     }

//     public Donation makeDonation(Donation donation, Long causeId) {
//         Cause cause = causeRepository.findById(causeId)
//                 .orElseThrow(() -> new EntityNotFoundException("Cause not found"));
//         if (!Boolean.TRUE.equals(cause.isActive())) {
//             throw new DataIntegrityViolationException("Cannot donate to inactive cause");
//         }
//         donation.setCause(cause);
//         if (cause.getCurrentAmount() == null) {
//             cause.setCurrentAmount(donation.getAmount());
//         } else {
//             cause.setCurrentAmount(cause.getCurrentAmount().add(donation.getAmount()));
//         }
//         return donationRepository.save(donation);
//     }
// }
