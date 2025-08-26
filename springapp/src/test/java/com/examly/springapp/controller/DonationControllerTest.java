package com.examly.springapp.controller;

import com.examly.springapp.model.Donation;
import com.examly.springapp.model.Cause;
import com.examly.springapp.service.DonationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DonationController.class)
class DonationControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    DonationService donationService;
    ObjectMapper mapper = new ObjectMapper();

    @Test
    void controller_makeDonationSuccess() throws Exception {
        Map<String, Object> req = Map.of(
                "amount", 100.0,
                "donorName", "John Doe",
                "donorEmail", "john@example.com",
                "message", "Happy to help!",
                "isAnonymous", false,
                "causeId", 1
        );
        Donation d = new Donation();
        d.setId(5L);
        d.setAmount(new BigDecimal("100.0"));
        d.setDonorName("John Doe");
        d.setDonorEmail("john@example.com");
        d.setMessage("Happy to help!");
        d.setIsAnonymous(false);
        d.setDonationDate(LocalDateTime.now());
        Cause c = new Cause();
        c.setId(1L);
        d.setCause(c);
        when(donationService.makeDonation(any(Donation.class), eq(1L))).thenReturn(d);
        mockMvc.perform(post("/api/donations")
                .contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.donorName").value("John Doe"));
    }

    @Test
    void controller_getDonationsByCauseAnonymized() throws Exception {
        Donation d1 = new Donation();
        d1.setId(1L);
        d1.setAmount(new BigDecimal("10.0"));
        d1.setDonorName("D1");
        d1.setDonorEmail("d1@email.com");
        d1.setIsAnonymous(true);
        d1.setMessage("msg");
        d1.setDonationDate(LocalDateTime.now());
        Cause c = new Cause(); c.setId(2L); d1.setCause(c);

        Donation d2 = new Donation();
        d2.setId(2L);
        d2.setAmount(new BigDecimal("15.0"));
        d2.setDonorName("D2");
        d2.setDonorEmail("d2@email.com");
        d2.setIsAnonymous(false);
        d2.setMessage("m2");
        d2.setDonationDate(LocalDateTime.now());
        d2.setCause(c);

        when(donationService.getDonationsByCauseId(2L)).thenReturn(List.of(d1, d2));
        mockMvc.perform(get("/api/donations/cause/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].donorName").doesNotExist())
                .andExpect(jsonPath("$[1].donorName").value("D2"));
    }

    @Test
    void controller_getDonationsByCauseNotFound() throws Exception {
        when(donationService.getDonationsByCauseId(9L)).thenThrow(new EntityNotFoundException("Cause not found"));
        mockMvc.perform(get("/api/donations/cause/9"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Cause not found"));
    }
}
