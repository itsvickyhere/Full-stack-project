package com.examly.springapp.controller;

import com.examly.springapp.model.Cause;
import com.examly.springapp.service.CauseService;
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
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CauseController.class)
class CauseControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    CauseService causeService;
    ObjectMapper mapper = new ObjectMapper();

    @Test
    void controller_createCauseValid() throws Exception {
        Cause cause = new Cause();
        cause.setTitle("Water");
        cause.setDescription("desc");
        cause.setTargetAmount(new BigDecimal("100.0"));
        cause.setCurrentAmount(BigDecimal.ZERO);
        cause.setStartDate(LocalDate.of(2023, 5, 1));
        cause.setEndDate(LocalDate.of(2023, 12, 1));
        cause.setIsActive(true);
        cause.setId(2L);
        Map<String, Object> req = Map.of(
            "title", "Water",
            "description", "desc",
            "targetAmount", 100.0,
            "startDate", "2023-05-01",
            "endDate", "2023-12-01",
            "ngoId", 1
        );
        when(causeService.createCause(any(Cause.class), eq(1L))).thenReturn(cause);
        mockMvc.perform(post("/api/causes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Water"));
    }

    @Test
    void controller_getActiveCausesWorks() throws Exception {
        Cause cause1 = new Cause();
        cause1.setTitle("A");
        Cause cause2 = new Cause();
        cause2.setTitle("B");
        when(causeService.getAllActiveCauses()).thenReturn(List.of(cause1, cause2));
        mockMvc.perform(get("/api/causes/active"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("A"));
    }

    @Test
    void controller_getCauseByIdNotFound() throws Exception {
        when(causeService.getCauseById(11L)).thenThrow(new EntityNotFoundException("Cause not found"));
        mockMvc.perform(get("/api/causes/11"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Cause not found"));
    }
}
