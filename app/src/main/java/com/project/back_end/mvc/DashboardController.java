package com.project.back_end.mvc;

import com.project.back_end.services.CommonService; // Assuming CommonService contains validateToken
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

/**
 * DashboardController
 * Serves as the gatekeeper for Thymeleaf views by validating tokens
 * before allowing access to sensitive dashboard templates.
 */
@Controller
public class DashboardController {

    // 2. Autowire the Shared Service
    @Autowired
    private CommonService commonService; 

    /**
     * 3. Define the adminDashboard Method
     * Handles: GET /adminDashboard/{token}
     */
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        // Validate token for "admin" role
        Map<String, String> errors = commonService.validateToken(token, "admin");

        // If the map is empty, the token is valid
        if (errors.isEmpty()) {
            return "admin/adminDashboard"; // Points to templates/admin/adminDashboard.html
        }

        // Redirect to login if unauthorized
        return "redirect:http://localhost:8080";
    }

    /**
     * 4. Define the doctorDashboard Method
     * Handles: GET /doctorDashboard/{token}
     */
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        // Validate token for "doctor" role
        Map<String, String> errors = commonService.validateToken(token, "doctor");

        if (errors.isEmpty()) {
            return "doctor/doctorDashboard"; // Points to templates/doctor/doctorDashboard.html
        }

        return "redirect:http://localhost:8080";
    }
}