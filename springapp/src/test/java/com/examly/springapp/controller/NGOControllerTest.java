package com.examly.springapp.controller;

import com.examly.springapp.model.NGO;
import com.examly.springapp.service.NGOService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@WebMvcTest(NGOController.class)
class NGOControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    NGOService ngoService;

    private ObjectMapper mapper;
    @BeforeEach
    void setUp() {
        mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
    }

    @Test
    void controller_createNGOSuccess() throws Exception {
        NGO ngo = new NGO();
        ngo.setName("NGO Test");
        ngo.setContactEmail("ngo@email.com");
        ngo.setRegistrationNumber("ABC123");

        when(ngoService.createNGO(any(NGO.class))).thenReturn(ngo);
        mockMvc.perform(post("/api/ngos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(ngo)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("NGO Test"));
    }

    @Test
    void controller_getAllNGOsWorks() throws Exception {
        NGO ngo1 = new NGO();
        ngo1.setName("NGO1");
        NGO ngo2 = new NGO();
        ngo2.setName("NGO2");

        when(ngoService.getAllNGOs()).thenReturn(List.of(ngo1, ngo2));
        mockMvc.perform(get("/api/ngos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("NGO1"));
    }

    @Test
    void controller_getNGOByIdNotFound() throws Exception {
        when(ngoService.getNGOById(99L)).thenThrow(new EntityNotFoundException("NGO not found"));
        mockMvc.perform(get("/api/ngos/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("NGO not found"));
    }
}
