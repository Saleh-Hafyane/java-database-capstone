/**
 * footer.js
 * Dynamically renders the footer across all pages.
 */

function renderFooter() {
    // 1. Select the footer element from the DOM
    const footerContainer = document.getElementById("footer");

    // Safety check: only proceed if the container exists on the current page
    if (!footerContainer) return;

    // 2-10. Construct the HTML structure and inject it
    footerContainer.innerHTML = `
        <footer class="footer">
            <div class="footer-container">
                
                <!-- 4. Hospital Logo and Copyright Info -->
                <div class="footer-logo">
                    <img src="../assets/images/logo/Logo.png" alt="Hospital CMS Logo">
                    <p>© Copyright 2026. All Rights Reserved by Hospital CMS.</p>
                </div>

                <!-- 5. Links Section Container -->
                <div class="footer-links">
                    
                    <!-- 6. Company Links Column -->
                    <div class="footer-column">
                        <h4>Company</h4>
                        <a href="#">About</a>
                        <a href="#">Careers</a>
                        <a href="#">Press</a>
                    </div>

                    <!-- 7. Support Links Column -->
                    <div class="footer-column">
                        <h4>Support</h4>
                        <a href="#">Account</a>
                        <a href="#">Help Center</a>
                        <a href="#">Contact Us</a>
                    </div>

                    <!-- 8. Legals Links Column -->
                    <div class="footer-column">
                        <h4>Legals</h4>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Licensing</a>
                    </div>

                </div> <!-- End of footer-links -->
            </div> <!-- End of footer-container -->
        </footer>
    `;
}

// 11. Call the function to populate the footer when the script loads
renderFooter();