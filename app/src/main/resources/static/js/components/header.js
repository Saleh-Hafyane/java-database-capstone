/**
 * header.js
 * Dynamically renders the header based on user role and session status.
 */

function renderHeader() {
    const headerDiv = document.getElementById("header");
    if (!headerDiv) return;

    // 3. Root Page Check
    if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
        localStorage.removeItem("userRole");
        headerDiv.innerHTML = `
            <header class="header">
                <div class="logo-section">
                    <img src="../assets/images/logo/Logo.png" alt="Hospital CRM Logo" class="logo-img">
                    <span class="logo-title">Hospital CMS</span>
                </div>
            </header>`;
        return;
    }

    // 4. Retrieve session data
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    // 5. Initialize base content
    let headerContent = `
        <header class="header">
            <div class="logo-section">
                <img src="../assets/images/logo/Logo.png" alt="Hospital CRM Logo" class="logo-img">
                <span class="logo-title">Hospital CMS</span>
            </div>
            <nav class="nav-links">`;

    // 6. Security Check: Session Expiry
    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
        localStorage.removeItem("userRole");
        alert("Session expired or invalid login. Please log in again.");
        window.location.href = "/";
        return;
    }

    // 7. Role-Specific Content
    if (role === "admin") {
        headerContent += `
            <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
            <a href="#" class="logout-link" onclick="logout()">Logout</a>`;
    } 
    else if (role === "doctor") {
        headerContent += `
            <button class="adminBtn" onclick="window.location.href='/pages/doctorDashboard.html'">Home</button>
            <a href="#" class="logout-link" onclick="logout()">Logout</a>`;
    } 
    else if (role === "patient") {
        headerContent += `
            <button id="patientLogin" class="adminBtn">Login</button>
            <button id="patientSignup" class="adminBtn">Sign Up</button>`;
    } 
    else if (role === "loggedPatient") {
        headerContent += `
            <button class="adminBtn" onclick="window.location.href='/pages/patientDashboard.html'">Home</button>
            <button class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
            <a href="#" class="logout-link" onclick="logoutPatient()">Logout</a>`;
    }

    // 9 & 10. Close and Render
    headerContent += `</nav></header>`;
    headerDiv.innerHTML = headerContent;

    // 11. Attach dynamic listeners
    attachHeaderButtonListeners();
}

/**
 * Helper Functions
 */

function attachHeaderButtonListeners() {
    const loginBtn = document.getElementById("patientLogin");
    const signupBtn = document.getElementById("patientSignup");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => openModal('login'));
    }
    if (signupBtn) {
        signupBtn.addEventListener("click", () => openModal('signup'));
    }
}

function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    window.location.href = "/";
}

function logoutPatient() {
    localStorage.removeItem("token");
    // We keep the role as 'patient' so the dashboard knows to show login options
    localStorage.setItem("userRole", "patient");
    window.location.href = "/";
}

// 16. Self-initialize
renderHeader();