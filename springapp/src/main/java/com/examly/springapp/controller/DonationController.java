package com.examly.springapp.controller;

import com.examly.springapp.model.Donation;
import com.examly.springapp.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @GetMapping("/cause/{causeId}")
    public ResponseEntity<List<Map<String, Object>>> getDonationsByCauseId(@PathVariable Long causeId) {
        List<Donation> donations = donationService.getDonationsByCauseId(causeId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Donation d : donations) {
            Map<String, Object> donationMap = new HashMap<>();
            donationMap.put("id", d.getId());
            donationMap.put("amount", d.getAmount());
            donationMap.put("message", d.getMessage());
            donationMap.put("donationDate", d.getDonationDate().toString());
            donationMap.put("isAnonymous", d.isAnonymous());

            if (!d.isAnonymous()) {
                donationMap.put("donorName", d.getDonorName());
                donationMap.put("donorEmail", d.getDonorEmail());
            }

            result.add(donationMap);
        }

        return ResponseEntity.ok(result);

    }

    @PostMapping
    public ResponseEntity<?> makeDonation(@RequestBody Map<String, Object> body) {
        Donation donation = new Donation();
        donation.setAmount(new BigDecimal(body.get("amount").toString()));
        donation.setDonorName((String) body.get("donorName"));
        donation.setDonorEmail((String) body.get("donorEmail"));
        donation.setMessage((String) body.get("message"));
        donation.setIsAnonymous(Boolean.parseBoolean(body.get("isAnonymous").toString()));
        Long causeId = Long.valueOf(body.get("causeId").toString());

        return ResponseEntity.status(201)
                .body(donationService.makeDonation(donation, causeId));
    }
}