/**
 * doctorServices.js
 * Handles CRUD operations and filtering for Doctor entities.
 */

import { API_BASE_URL } from "../config/config.js";

// Define the full endpoint for doctor-related actions
const DOCTOR_API = API_BASE_URL + '/doctor';

/**
 * Fetch the list of all doctors from the API
 */
export async function getDoctors() {
    try {
        const response = await fetch(DOCTOR_API);
        const data = await response.json();
        // Returns the 'doctors' array from the response
        return data.doctors || [];
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return []; // Return empty array on network issue
    }
}

/**
 * Delete a specific doctor using their ID and an admin authentication token
 */
export async function deleteDoctor(id, token) {
    try {
        // Constructing URL with path parameters
        const response = await fetch(`${DOCTOR_API}/${id}/${token}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        
        return {
            success: response.ok,
            message: data.message || "Delete operation processed."
        };
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return { success: false, message: "Server error during deletion." };
    }
}

/**
 * Save (create) a new doctor record
 */
export async function saveDoctor(doctor, token) {
    try {
        // POST request with token in the path
        const response = await fetch(`${DOCTOR_API}/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doctor)
        });

        const data = await response.json();
        return {
            success: response.ok,
            message: data.message || "Save operation processed."
        };
    } catch (error) {
        console.error("Error saving doctor:", error);
        return { success: false, message: "Connection error: could not save doctor." };
    }
}

/**
 * Fetch doctors based on filtering criteria
 */
export async function filterDoctors(name, time, specialty) {
    try {
        // Path parameters: name, time, specialty
        // Note: Using 'null' as a string placeholder for empty values to maintain path structure
        const n = name || "null";
        const t = time || "null";
        const s = specialty || "null";

        const response = await fetch(`${DOCTOR_API}/${n}/${t}/${s}`);

        if (response.ok) {
            const data = await response.json();
            return data.doctors || [];
        } else {
            console.error("Filter failed with status:", response.status);
            return [];
        }
    } catch (error) {
        console.error("Error filtering doctors:", error);
        alert("An error occurred while filtering. Please try again.");
        return [];
    }
}