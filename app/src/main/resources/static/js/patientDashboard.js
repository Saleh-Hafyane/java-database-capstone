import { createDoctorCard } from "./components/doctorCard.js";
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { patientLogin, patientSignup } from "./services/patientServices.js";

async function loadDoctorCards() {
    const doctors = await getDoctors();
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";
    doctors.forEach(doc => contentDiv.appendChild(createDoctorCard(doc)));
}

// Modal Triggers
document.getElementById("patientSignup")?.addEventListener("click", () => openModal("patientSignup"));
document.getElementById("patientLogin")?.addEventListener("click", () => openModal("patientLogin"));

// Filtering
async function filterDoctorsOnChange() {
    const name = document.getElementById("searchBar").value;
    const time = document.getElementById("filterTime").value;
    const specialty = document.getElementById("filterSpecialty").value;

    const filtered = await filterDoctors(name, time, specialty);
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";
    
    if (filtered.length > 0) {
        filtered.forEach(doc => contentDiv.appendChild(createDoctorCard(doc)));
    } else {
        contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
    }
}

document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);

// Global Handlers for Modal Forms
window.signupPatient = async function () {
    const data = {
        name: document.getElementById("pName").value,
        email: document.getElementById("pEmail").value,
        password: document.getElementById("pPass").value,
        phone: document.getElementById("pPhone").value,
        address: document.getElementById("pAddress").value
    };
    const res = await patientSignup(data);
    if (res.success) { alert("Signup Successful!"); location.reload(); }
};

window.loginPatient = async function () {
    const data = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPass").value
    };
    const res = await patientLogin(data);
    if (res.ok) {
        const body = await res.json();
        localStorage.setItem("token", body.token);
        window.location.href = "loggedPatientDashboard.html";
    } else {
        alert("Login Failed");
    }
};

document.addEventListener("DOMContentLoaded", loadDoctorCards);