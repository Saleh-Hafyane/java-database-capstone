/**
 * patientServices.js
 * Handles all API communication regarding patient accounts and appointments.
 */
import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + '/patient';

// Register a new patient
export async function patientSignup(data) {
    try {
        const response = await fetch(`${PATIENT_API}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return { success: response.ok, message: result.message };
    } catch (error) {
        console.error("Signup Error:", error);
        return { success: false, message: "Connection to server failed" };
    }
}

// Authenticate a patient
export async function patientLogin(data) {
    try {
        // Return full response so dashboard can handle token extraction
        return await fetch(`${PATIENT_API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
}

// Get profile info of the logged-in patient
export async function getPatientData(token) {
    try {
        const response = await fetch(`${PATIENT_API}/data?token=${token}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Error fetching patient data:", error);
        return null;
    }
}

// Get appointments for either a patient or a doctor
export async function getPatientAppointments(id, token, user) {
    try {
        // user parameter determines if we hit /patient/appointments or /doctor/appointments
        const response = await fetch(`${API_BASE_URL}/${user}/appointments/${id}?token=${token}`);
        if (!response.ok) throw new Error("Failed to load appointments");
        return await response.json();
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return null;
    }
}

// Filter appointments by status (pending/consulted) and doctor name
export async function filterAppointments(condition, name, token) {
    try {
        const url = `${PATIENT_API}/appointments/${condition}/${name || 'null'}?token=${token}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Filter failed");
        return await response.json();
    } catch (error) {
        console.error("Filter error:", error);
        return [];
    }
}