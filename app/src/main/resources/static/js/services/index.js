/**
 * index.js
 * Manages authentication and modal triggers for the landing page.
 */

import { openModal } from "../components/modals.js";
import { API_BASE_URL } from "../config/config.js";

// Define login endpoints
const ADMIN_API = API_BASE_URL + '/admin';
const DOCTOR_API = API_BASE_URL + '/doctor/login';

// --- Initialization ---
window.onload = function () {
    const adminBtn = document.getElementById('adminLogin');
    const doctorBtn = document.getElementById('doctorLogin');

    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            openModal('adminLogin');
        });
    }

    if (doctorBtn) {
        doctorBtn.addEventListener('click', () => {
            openModal('doctorLogin');
        });
    }
};

// --- Admin Login Handler ---
window.adminLoginHandler = async function () {
    // Step 1: Get credentials
    const username = document.getElementById("adminUsername")?.value;
    const password = document.getElementById("adminPassword")?.value;

    // Step 2: Create object
    const admin = { username, password };

    try {
        // Step 3: Send POST request
        const response = await fetch(ADMIN_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin)
        });

        // Step 4: Handle success
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token); // Save JWT
            
            if (typeof selectRole === "function") {
                selectRole('admin');
            } else {
                localStorage.setItem("userRole", "admin");
                window.location.href = "/pages/adminDashboard.html";
            }
        } else {
            // Step 5: Handle failure
            alert("Invalid credentials! Please try again.");
        }
    } catch (error) {
        // Step 6: Handle network/server errors
        console.error("Admin Login Error:", error);
        alert("Server error. Please ensure the backend is running.");
    }
};

// --- Doctor Login Handler ---
window.doctorLoginHandler = async function () {
    // Step 1: Get credentials
    const email = document.getElementById("doctorEmail")?.value;
    const password = document.getElementById("doctorPassword")?.value;

    // Step 2: Create object
    const doctor = { email, password };

    try {
        // Step 3: Send request
        const response = await fetch(DOCTOR_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor)
        });

        // Step 4: Handle success
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            
            if (typeof selectRole === "function") {
                selectRole('doctor');
            } else {
                localStorage.setItem("userRole", "doctor");
                window.location.href = "/pages/doctorDashboard.html";
            }
        } else {
            // Step 5: Handle failure
            alert("Invalid doctor credentials!");
        }
    } catch (error) {
        // Step 6: Handle error
        console.error("Doctor Login Error:", error);
        alert("An unexpected error occurred during login.");
    }
};