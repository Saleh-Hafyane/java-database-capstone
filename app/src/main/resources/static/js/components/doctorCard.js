/**
 * doctorCard.js
 * Generates an interactive card for each doctor based on user permissions.
 */

// 1. Imports
import { showBookingOverlay } from "../services/loggedPatient.js";
import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";

// 2. Main Function
export function createDoctorCard(doctor) {
    // Create the main container
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    // Retrieve the current user role
    const role = localStorage.getItem("userRole");

    // 3. Create Doctor Info Section
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("doctor-info");

    const name = document.createElement("h3");
    name.textContent = `Dr. ${doctor.name}`;

    const specialization = document.createElement("p");
    specialization.classList.add("specialty");
    specialization.textContent = doctor.specialty;

    const email = document.createElement("p");
    email.classList.add("email");
    email.textContent = doctor.email;

    const availability = document.createElement("p");
    availability.classList.add("availability");
    // List available appointment times joined by commas
    availability.textContent = `Availability: ${doctor.availability.join(", ")}`;

    // Append info elements
    infoDiv.appendChild(name);
    infoDiv.appendChild(specialization);
    infoDiv.appendChild(email);
    infoDiv.appendChild(availability);

    // 4. Create Button Container
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-actions");

    // 5. === ADMIN ROLE ACTIONS ===
    if (role === "admin") {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete Doctor";
        removeBtn.classList.add("delete-btn");

        removeBtn.addEventListener("click", async () => {
            const token = localStorage.getItem("token");
            if (confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
                try {
                    const success = await deleteDoctor(doctor.id, token);
                    if (success) {
                        alert("Doctor removed successfully.");
                        card.remove(); // Remove the element from the DOM
                    }
                } catch (error) {
                    alert("Error deleting doctor. Please try again.");
                }
            }
        });
        actionsDiv.appendChild(removeBtn);
    }

    // 6. === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
    else if (role === "patient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";
        bookNow.classList.add("book-btn");

        bookNow.addEventListener("click", () => {
            alert("You must log in as a patient to book an appointment.");
        });
        actionsDiv.appendChild(bookNow);
    }

    // 7. === LOGGED-IN PATIENT ROLE ACTIONS ===
    else if (role === "loggedPatient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Appointment";
        bookNow.classList.add("book-btn");

        bookNow.addEventListener("click", async (e) => {
            const token = localStorage.getItem("token");
            
            if (!token) {
                alert("Session invalid. Redirecting to login.");
                window.location.href = "/";
                return;
            }

            try {
                // Fetch current patient details
                const patientData = await getPatientData(token);
                // Show the booking overlay UI
                showBookingOverlay(e, doctor, patientData);
            } catch (error) {
                console.error("Booking failed to initialize:", error);
            }
        });
        actionsDiv.appendChild(bookNow);
    }

    // 8. Final Assembly
    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    return card;
}