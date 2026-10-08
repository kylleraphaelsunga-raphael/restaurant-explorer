// ======================================
// DINE & SEEK ADMIN LOGIN
// ======================================

const loginForm = document.getElementById("adminLoginForm");
const usernameInput = document.getElementById("adminUsername");
const passwordInput = document.getElementById("adminPassword");

const loginError = document.getElementById("loginError");

const demoToggle = document.getElementById("demoToggle");
const demoDetails = document.getElementById("demoDetails");
const useDemoAccount = document.getElementById("useDemoAccount");


// ======================================
// DEMO ACCOUNT
// ======================================

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "admin123";


// ======================================
// SHOW / HIDE DEMO ACCOUNT DETAILS
// ======================================

demoToggle.addEventListener("click", () => {

    if (demoDetails.style.display === "none") {

        demoDetails.style.display = "block";
        demoToggle.textContent = "Hide Demo Account Login Details";

    } else {

        demoDetails.style.display = "none";
        demoToggle.textContent = "Demo Account Login Details";

    }

});


// ======================================
// AUTO-FILL DEMO ACCOUNT
// ======================================

useDemoAccount.addEventListener("click", () => {

    usernameInput.value = DEMO_USERNAME;
    passwordInput.value = DEMO_PASSWORD;

    loginError.style.display = "none";

    usernameInput.focus();

});


// ======================================
// LOGIN
// ======================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    loginError.style.display = "none";

    try {

        const response = await fetch("/api/admin/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })

        });


        const result = await response.json();


        if (!response.ok) {

            loginError.textContent =
                result.error || "Invalid username or password.";

            loginError.style.display = "block";

            return;
        }


        // Login successful
        window.location.href = "admin.html";

    } catch (error) {

        console.error("Login Error:", error);

        loginError.textContent =
            "Unable to connect to the server.";

        loginError.style.display = "block";

    }

});