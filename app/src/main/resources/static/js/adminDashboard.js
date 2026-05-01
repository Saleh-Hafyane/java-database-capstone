/**
 * adminDashboard.js
 * Manages doctor inventory, filtering, and registration for Administrators.
 */

import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

// --- 1. Modal Trigger ---
document.getElementById('addDocBtn')?.addEventListener('click', () => {
    openModal('addDoctor');
});

// --- 2. Initial Load ---
document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();
});

/**
 * 3. loadDoctorCards
 * Fetches all doctors and populates the dashboard.
 */
async function loadDoctorCards() {
    try {
        const doctors = await getDoctors();
        renderDoctorCards(doctors);
    } catch (error) {
        console.error("Failed to load doctor cards:", error);
    }
}

// --- 4. Event Listeners for Search & Filters ---
const searchBar = document.getElementById("searchBar");
const filterTime = document.getElementById("filterTime");
const filterSpecialty = document.getElementById("filterSpecialty");

[searchBar, filterTime, filterSpecialty].forEach(element => {
    if (element) {
        // Use 'input' for real-time text search and 'change' for dropdowns
        const eventType = element.id === "searchBar" ? "input" : "change";
        element.addEventListener(eventType, filterDoctorsOnChange);
    }
});

/**
 * 5. filterDoctorsOnChange
 * Gathers filter values and updates the UI with filtered results.
 */
async function filterDoctorsOnChange() {
    const name = searchBar.value.trim() || null;
    const time = filterTime.value || null;
    const specialty = filterSpecialty.value || null;

    try {
        const filteredDoctors = await filterDoctors(name, time, specialty);
        renderDoctorCards(filteredDoctors);
    } catch (error) {
        alert("Error filtering doctors. Please try again.");
    }
}

/**
 * 6. renderDoctorCards (Helper)
 * Clears the content div and injects new cards.
 */
function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");
    if (!contentDiv) return;

    contentDiv.innerHTML = ""; // Clear existing content

    if (!doctors || doctors.length === 0) {
        contentDiv.innerHTML = `<p class="no-results">No doctors found with the given filters.</p>`;
        return;
    }

    doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
    });
}

/**
 * 7. adminAddDoctor (Global Scope for Modal Form)
 * Handles the submission of the "Add Doctor" form.
 */
window.adminAddDoctor = async function () {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Unauthorized action. Please log in as an admin.");
        return;
    }

    // Collect Availability from Checkboxes
    const selectedTimes = Array.from(document.querySelectorAll('input[name="availability"]:checked'))
                               .map(cb => cb.value);

    // Build the Doctor Object
    const newDoctor = {
        name: document.getElementById("docName").value,
        email: document.getElementById("docEmail").value,
        mobile: document.getElementById("docMobile").value,
        password: document.getElementById("docPassword").value,
        specialty: document.getElementById("docSpecialty").value,
        availability: selectedTimes
    };

    try {
        const result = await saveDoctor(newDoctor, token);
        if (result.success) {
            alert("Doctor added successfully!");
            location.reload(); // Refresh to show new card and close modal
        } else {
            alert("Failed to add doctor: " + result.message);
        }
    } catch (error) {
        alert("A server error occurred while saving the doctor.");
    }
};