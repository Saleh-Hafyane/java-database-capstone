/**
 * doctorDashboard.js
 * Manages the doctor's view of scheduled appointments.
 */

import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

// --- State and Constants ---
const tableBody = document.getElementById("patientTableBody");
const token = localStorage.getItem("token");
let selectedDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD
let patientName = "null"; // Backend expectation for empty name filters

// --- Search Functionality ---
const searchBar = document.getElementById("searchBar");
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        patientName = value !== "" ? value : "null";
        loadAppointments();
    });
}

// --- Date Filter: Today Button ---
const todayButton = document.getElementById("todayButton");
const datePicker = document.getElementById("datePicker");

if (todayButton) {
    todayButton.addEventListener('click', () => {
        selectedDate = new Date().toISOString().split('T')[0];
        if (datePicker) datePicker.value = selectedDate;
        loadAppointments();
    });
}

// --- Date Filter: Specific Date Picker ---
if (datePicker) {
    datePicker.addEventListener('change', (e) => {
        selectedDate = e.target.value;
        loadAppointments();
    });
}

/**
 * loadAppointments
 * Fetches data from the backend and updates the table UI.
 */
async function loadAppointments() {
    try {
        // Step 1: Fetch data
        const appointments = await getAllAppointments(selectedDate, patientName, token);
        
        // Step 2: Clear UI
        tableBody.innerHTML = "";

        // Step 3: Handle empty results
        if (!appointments || appointments.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" class="text-center">No Appointments found for today.</td></tr>`;
            return;
        }

        // Step 4: Render rows
        appointments.forEach(app => {
            // Construct patient object from appointment data
            const patientObj = {
                id: app.patientId || app.id,
                name: app.patientName,
                phone: app.patientPhone || "N/A",
                email: app.patientEmail || "N/A"
            };
            
            const row = createPatientRow(app, patientObj);
            tableBody.appendChild(row);
        });

    } catch (error) {
        // Step 5: Error handling
        console.error("Dashboard Load Error:", error);
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center error">Error loading appointments. Try again later.</td></tr>`;
    }
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    // Set initial date picker value
    if (datePicker) datePicker.value = selectedDate;
    
    // If a renderContent function exists for layout setup, call it
    if (typeof renderContent === "function") {
        renderContent();
    }
    
    loadAppointments();
});