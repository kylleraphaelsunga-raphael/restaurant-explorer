// ======================================
// DINE & SEEK ADMIN JAVASCRIPT
// Login + Create + Read + Update + Delete
// ======================================


// ======================================
// DEMO ACCOUNT
// ======================================

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "admin123";


// ======================================
// HELPER FUNCTIONS
// ======================================

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}


async function getResponseData(response) {
    const text = await response.text();

    try {
        return text ? JSON.parse(text) : {};
    } catch {
        return {
            error: text || "The server returned an invalid response."
        };
    }
}


function getErrorMessage(result, fallback) {
    return result?.error || result?.message || fallback;
}


async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            ...(options.body ? {
                "Content-Type": "application/json"
            } : {}),
            ...options.headers
        }
    });

    const result = await getResponseData(response);

    if (!response.ok) {
        throw new Error(
            getErrorMessage(result, "The request could not be completed.")
        );
    }

    return result;
}


function showMessage(element, message, isError = false) {
    if (!element) return;

    element.textContent = message;
    element.hidden = false;
    element.classList.toggle("error", isError);
    element.classList.toggle("success", !isError);
}


function hideMessage(element) {
    if (!element) return;

    element.textContent = "";
    element.hidden = true;
    element.classList.remove("error", "success");
}


function getRestaurantFormData(prefix) {
    const scoreInput = document.getElementById(`${prefix}Score`);

    return {
        name: document.getElementById(`${prefix}Name`).value.trim(),
        borough: document.getElementById(`${prefix}Borough`).value.trim(),
        cuisine: document.getElementById(`${prefix}Cuisine`).value.trim(),
        grade: document.getElementById(`${prefix}Grade`).value,
        score: Number(scoreInput.value),
        restaurant_id: document
            .getElementById(`${prefix}RestaurantId`)
            .value.trim()
    };
}


function validateRestaurantData(data) {
    if (!data.name || !data.borough || !data.cuisine || !data.grade) {
        return "Please complete all required restaurant fields.";
    }

    if (!["A", "B", "C"].includes(data.grade)) {
        return "Please select a valid grade.";
    }

    if (
        data.score === "" ||
        !Number.isFinite(data.score) ||
        data.score < 0
    ) {
        return "Please enter a valid score of zero or higher.";
    }

    return "";
}


// ======================================
// ADMIN LOGIN
// Runs only on the login page
// ======================================

const loginForm = document.getElementById("adminLoginForm");

if (loginForm) {
    const usernameInput = document.getElementById("adminUsername");
    const passwordInput = document.getElementById("adminPassword");
    const loginError = document.getElementById("loginError");

    const demoToggle = document.getElementById("demoToggle");
    const demoDetails = document.getElementById("demoDetails");
    const useDemoAccount = document.getElementById("useDemoAccount");


    // Show or hide demo account details
    if (demoToggle && demoDetails) {
        demoToggle.addEventListener("click", () => {
            const isHidden = getComputedStyle(demoDetails).display === "none";

            demoDetails.style.display = isHidden ? "block" : "none";

            demoToggle.textContent = isHidden
                ? "Hide Demo Account Login Details"
                : "Demo Account Login Details";
        });
    }


    // Auto-fill demo credentials
    if (useDemoAccount) {
        useDemoAccount.addEventListener("click", () => {
            usernameInput.value = DEMO_USERNAME;
            passwordInput.value = DEMO_PASSWORD;

            if (loginError) {
                loginError.textContent = "";
                loginError.style.display = "none";
            }

            usernameInput.focus();
        });
    }


    // Submit login
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (loginError) {
            loginError.textContent = "";
            loginError.style.display = "none";
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        const submitButton = loginForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Logging in...";
        }

        try {
            await apiRequest("/api/admin/login", {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password
                })
            });

            window.location.href = "admin.html";

        } catch (error) {
            console.error("Login Error:", error);

            if (loginError) {
                loginError.textContent =
                    error.message || "Unable to connect to the server.";

                loginError.style.display = "block";
            }

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Login";
            }
        }
    });
}


// ======================================
// ADMIN DASHBOARD
// Runs only on the dashboard page
// ======================================

const createSection = document.getElementById("createSection");
const readSection = document.getElementById("readSection");
const updateSection = document.getElementById("updateSection");
const deleteSection = document.getElementById("deleteSection");

const isDashboardPage = Boolean(
    createSection &&
    readSection &&
    updateSection &&
    deleteSection
);


if (isDashboardPage) {
    let restaurants = [];


    // ======================================
    // LOGOUT
    // ======================================

    const logoutButton = document.getElementById("adminLogout");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // This returns to the login page.
            // Change the filename if your login HTML has a different name.
            window.location.href = "index.html";
        });
    }


    // ======================================
    // CRUD TAB NAVIGATION
    // ======================================

    const adminTabs = document.querySelectorAll(".admin-tab");

    const sections = {
        create: createSection,
        read: readSection,
        update: updateSection,
        delete: deleteSection
    };


    function switchTab(tabName) {
        if (!sections[tabName]) return;

        Object.entries(sections).forEach(([name, section]) => {
            section.hidden = name !== tabName;
        });

        adminTabs.forEach((tab) => {
            const isActive = tab.dataset.tab === tabName;

            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
        });
    }


    adminTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            switchTab(tab.dataset.tab);
        });
    });


    // ======================================
    // TABLE RENDERING
    // ======================================

    function getRestaurantValues(restaurant) {
        return {
            id: String(restaurant._id ?? ""),
            name: restaurant.name ?? "",
            borough: restaurant.borough ?? "",
            cuisine: String(restaurant.cuisine ?? "").trim(),
            grade: restaurant.grade ?? "N/A",
            score: restaurant.score ?? "N/A",
            restaurant_id: restaurant.restaurant_id ?? ""
        };
    }


    function getRestaurantRow(restaurant, action = "") {
        const item = getRestaurantValues(restaurant);

        const actionCell = action
            ? `
                <td>
                    <button
                        type="button"
                        class="table-button ${action === "delete" ? "danger" : ""}"
                        data-action="${action}"
                        data-id="${escapeHTML(item.id)}"
                    >
                        ${action === "update" ? "Edit" : "Delete"}
                    </button>
                </td>
            `
            : "";

        return `
            <tr>
                <td>${escapeHTML(item.name)}</td>
                <td>${escapeHTML(item.borough)}</td>
                <td>${escapeHTML(item.cuisine)}</td>
                <td>${escapeHTML(item.grade)}</td>
                <td>${escapeHTML(item.score)}</td>
                ${actionCell}
            </tr>
        `;
    }

        function renderTable(tbody, searchInput, noResults, action = "") {
            if (!tbody) return;

            const searchTerm = searchInput?.value.trim().toLowerCase() || "";

            const filteredRestaurants = restaurants.filter((restaurant) => {
                const item = getRestaurantValues(restaurant);

                const searchableText = [
                    item.name,
                    item.borough,
                    item.cuisine,
                    item.grade,
                    item.score,
                    item.restaurant_id
                ].join(" ").toLowerCase();

                return searchableText.includes(searchTerm);
            });

            // Update the count only for the Read table.
            if (tbody.id === "readRestaurantList") {
                const readMessage = document.getElementById("readMessage");

                if (readMessage) {
                    readMessage.textContent = searchTerm
                        ? `${filteredRestaurants.length} matching restaurant record(s) found.`
                        : `Loaded ${restaurants.length} restaurant record(s).`;
                }
            }

            console.log("Total restaurants:", restaurants.length);
            console.log("Filtered restaurants:", filteredRestaurants.length);
            console.log("Table body:", tbody.id);

            if (filteredRestaurants.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="${action ? 6 : 5}" class="loading-table">
                            No matching restaurant records.
                        </td>
                    </tr>
                `;

                if (noResults) {
                    noResults.hidden = true;
                }

                return;
            }

            tbody.innerHTML = filteredRestaurants
                .map((restaurant) => getRestaurantRow(restaurant, action))
                .join("");

            if (noResults) {
                noResults.hidden = true;
            }
        }

        function renderAllTables() {
            renderTable(
                document.getElementById("readRestaurantList"),
                document.getElementById("readSearch"),
                document.getElementById("readNoResults")
            );

            renderTable(
                document.getElementById("updateRestaurantList"),
                document.getElementById("updateSearch"),
                null,
                "update"
            );

            renderTable(
                document.getElementById("deleteRestaurantList"),
                document.getElementById("deleteSearch"),
                document.getElementById("deleteNoResults"),
                "delete"
            );
        }

// ======================================
// LOAD RESTAURANTS FROM MONGODB API
// ======================================

async function loadRestaurants() {
    const readList = document.getElementById("readRestaurantList");
    const updateList = document.getElementById("updateRestaurantList");
    const deleteList = document.getElementById("deleteRestaurantList");

    [readList, updateList, deleteList].forEach((tbody) => {
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="loading-table">
                        Loading restaurants...
                    </td>
                </tr>
            `;
        }
    });

    try {
        const result = await apiRequest("/api/admin/restaurants");

        // Accept either a direct array or { restaurants: [...] }.
        restaurants = Array.isArray(result)
            ? result
            : Array.isArray(result.restaurants)
                ? result.restaurants
                : [];

        // Render the Read, Update, and Delete tables.
        renderAllTables();

        // Count records matching the Read search.
        const readSearch = document.getElementById("readSearch");
        const searchTerm = readSearch?.value.trim().toLowerCase() || "";

        const matchingCount = restaurants.filter((restaurant) => {
            const item = getRestaurantValues(restaurant);

            const searchableText = [
                item.name,
                item.borough,
                item.cuisine,
                item.grade,
                item.score,
                item.restaurant_id
            ].join(" ").toLowerCase();

            return searchableText.includes(searchTerm);
        }).length;

        showMessage(
            document.getElementById("readMessage"),
            searchTerm
                ? `${matchingCount} matching restaurant record(s) found.`
                : `Loaded ${restaurants.length} restaurant record(s).`
        );

    } catch (error) {
        console.error("Load Restaurants Error:", error);

        restaurants = [];

        [readList, updateList, deleteList].forEach((tbody) => {
            if (tbody) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="loading-table">
                            Unable to load restaurants. Check the server and MongoDB connection.
                        </td>
                    </tr>
                `;
            }
        });

        showMessage(
            document.getElementById("readMessage"),
            error.message || "Unable to load restaurant records.",
            true
        );
    }
}

    // Refresh button
    const refreshButton = document.getElementById("refreshRestaurants");

    if (refreshButton) {
        refreshButton.addEventListener("click", loadRestaurants);
    }


    // Search inputs
    [
        ["readSearch", "readRestaurantList", "readNoResults", ""],
        ["updateSearch", "updateRestaurantList", null, "update"],
        ["deleteSearch", "deleteRestaurantList", "deleteNoResults", "delete"]
    ].forEach(([inputId, tbodyId, noResultsId, action]) => {
        const searchInput = document.getElementById(inputId);

        if (searchInput) {
            searchInput.addEventListener("input", () => {
                renderTable(
                    document.getElementById(tbodyId),
                    searchInput,
                    noResultsId
                        ? document.getElementById(noResultsId)
                        : null,
                    action
                );
            });
        }
    });


    // ======================================
    // CREATE RESTAURANT
    // ======================================

    const createForm = document.getElementById("createRestaurantForm");
    const createMessage = document.getElementById("createMessage");

    if (createForm) {
        createForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            hideMessage(createMessage);

            const data = getRestaurantFormData("create");
            const validationError = validateRestaurantData(data);

            if (validationError) {
                showMessage(createMessage, validationError, true);
                return;
            }

            const submitButton = createForm.querySelector(
                'button[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Adding...";
            }

            try {
                await apiRequest("/api/admin/restaurants", {
                    method: "POST",
                    body: JSON.stringify(data)
                });

                createForm.reset();

                showMessage(
                    createMessage,
                    "Restaurant added successfully."
                );

                await loadRestaurants();

            } catch (error) {
                console.error("Create Restaurant Error:", error);

                showMessage(
                    createMessage,
                    error.message || "Unable to add restaurant.",
                    true
                );

            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Add Restaurant";
                }
            }
        });
    }


    // ======================================
    // SELECT RESTAURANT FOR UPDATE
    // ======================================

    const updateList = document.getElementById("updateRestaurantList");
    const updateFormContainer = document.getElementById("updateFormContainer");
    const updateForm = document.getElementById("updateRestaurantForm");
    const updateMessage = document.getElementById("updateMessage");

    function fillUpdateForm(restaurant) {
        const item = getRestaurantValues(restaurant);

        document.getElementById("updateDocumentId").value = item.id;
        document.getElementById("updateName").value = item.name;
        document.getElementById("updateBorough").value = item.borough;
        document.getElementById("updateCuisine").value = item.cuisine;

        document.getElementById("updateGrade").value =
            ["A", "B", "C"].includes(item.grade) ? item.grade : "";

        document.getElementById("updateScore").value =
            typeof item.score === "number" ? item.score : "";

        document.getElementById("updateRestaurantId").value =
            item.restaurant_id;

        hideMessage(updateMessage);

        // Open the popup instead of scrolling down the page
        updateFormContainer.hidden = false;
        document.body.classList.add("modal-open");

        document.getElementById("updateName").focus();
    }

    if (updateList) {
        updateList.addEventListener("click", (event) => {
            const button = event.target.closest('[data-action="update"]');

            if (!button) return;

            const restaurant = restaurants.find(
                (item) => String(item._id) === button.dataset.id
            );

            if (!restaurant) {
                showMessage(
                    updateMessage,
                    "The selected restaurant could not be found. Refresh the records.",
                    true
                );
                return;
            }

            fillUpdateForm(restaurant);
        });
    }


    // ======================================
    // SAVE RESTAURANT CHANGES
    // ======================================

    if (updateForm) {
        updateForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            hideMessage(updateMessage);

            const id = document.getElementById("updateDocumentId").value;
            const data = getRestaurantFormData("update");

            const validationError = validateRestaurantData(data);

            if (validationError) {
                showMessage(updateMessage, validationError, true);
                return;
            }

            if (!id) {
                showMessage(
                    updateMessage,
                    "Please select a restaurant to update.",
                    true
                );
                return;
            }

            const submitButton = updateForm.querySelector(
                'button[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Saving...";
            }

            try {
                await apiRequest(
                    `/api/admin/restaurants/${encodeURIComponent(id)}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(data)
                    }
                );

            closeEditModal();

                showMessage(
                    updateMessage,
                    "Restaurant updated successfully."
                );

                await loadRestaurants();

            } catch (error) {
                console.error("Update Restaurant Error:", error);

                showMessage(
                    updateMessage,
                    error.message || "Unable to update restaurant.",
                    true
                );

            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Save Changes";
                }
            }
        });
    }


    // Cancel editing
    const cancelUpdateButton = document.getElementById("cancelUpdate");
    const closeUpdateModal = document.getElementById("closeUpdateModal");

    function closeEditModal() {
        updateForm.reset();
        updateFormContainer.hidden = true;
        document.body.classList.remove("modal-open");
        hideMessage(updateMessage);
    }

    if (cancelUpdateButton) {
        cancelUpdateButton.addEventListener("click", closeEditModal);
    }

    if (closeUpdateModal) {
        closeUpdateModal.addEventListener("click", closeEditModal);
    }

    // Close when clicking the dark background
    const modalBackdrop = updateFormContainer.querySelector("[data-close-modal]");

    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closeEditModal);
    }

    // Close when pressing Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !updateFormContainer.hidden) {
            closeEditModal();
        }
    });


    // ======================================
    // DELETE RESTAURANT
    // ======================================

    const deleteList = document.getElementById("deleteRestaurantList");
    const deleteMessage = document.getElementById("deleteMessage");

    if (deleteList) {
        deleteList.addEventListener("click", async (event) => {
            const button = event.target.closest('[data-action="delete"]');

            if (!button) return;

            const id = button.dataset.id;

            const restaurant = restaurants.find(
                (item) => String(item._id) === id
            );

            if (!restaurant) {
                showMessage(
                    deleteMessage,
                    "The selected restaurant could not be found. Refresh the records.",
                    true
                );
                return;
            }

            const confirmed = window.confirm(
                `Are you sure you want to delete "${restaurant.name}"?\n\nThis action cannot be undone.`
            );

            if (!confirmed) return;

            button.disabled = true;
            button.textContent = "Deleting...";
            hideMessage(deleteMessage);

            try {
                await apiRequest(
                    `/api/admin/restaurants/${encodeURIComponent(id)}`,
                    {
                        method: "DELETE"
                    }
                );

                showMessage(
                    deleteMessage,
                    `"${restaurant.name}" was deleted successfully.`
                );

                await loadRestaurants();

            } catch (error) {
                console.error("Delete Restaurant Error:", error);

                showMessage(
                    deleteMessage,
                    error.message || "Unable to delete restaurant.",
                    true
                );

                button.disabled = false;
                button.textContent = "Delete";
            }
        });
    }


    // ======================================
    // INITIALIZE DASHBOARD
    // ======================================

    switchTab("read");
    loadRestaurants();
}