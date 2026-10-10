// ===============================
// RESTAURANT IMAGES
// ===============================

const foodImages = [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80"
];

// ===============================
// FEATURED RESTAURANT INFORMATION
// ===============================

const featuredInfo = {

    // =====================================
    // FEATURED RESTAURANTS
    // =====================================

    "Locanda Vini E Olii": {
        description: "A cozy Italian restaurant offering traditional Italian dishes in a warm and welcoming setting.",
        address: "Biddrina Gelato, 129, Gates Avenue, Brooklyn, Kings County, New York, 11238, United States",
        openingTime: "11:30 AM",
        closingTime: "10:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(718) 456-1234",
        priceRange: "$$$",
        additional: "Dine-in and takeout available."
    },

    "1 East 66Th Street Kitchen": {
        description: "A stylish restaurant offering a variety of dishes in an elegant dining environment.",
        address: "1 East 66th Street, New York, New York",
        openingTime: "11:00 AM",
        closingTime: "10:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(212) 555-1234",
        priceRange: "$$$",
        additional: "Dine-in and reservations available."
    },

    "101 Deli": {
        description: "A casual deli serving convenient meals, sandwiches, and other everyday favorites.",
        address: "101 Example Street, New York, New York",
        openingTime: "7:00 AM",
        closingTime: "9:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(212) 555-2345",
        priceRange: "$$",
        additional: "Takeout and quick dining available."
    },

    "101 Restaurant And Bar": {
        description: "A casual restaurant and bar offering a relaxed atmosphere and a selection of food and drinks.",
        address: "101 Example Avenue, New York, New York",
        openingTime: "11:00 AM",
        closingTime: "11:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(212) 555-3456",
        priceRange: "$$",
        additional: "Dine-in and group dining available."
    },

    "1020 Bar": {
        description: "A casual neighborhood spot offering food, drinks, and a relaxed dining experience.",
        address: "1020 Example Street, New York, New York",
        openingTime: "12:00 PM",
        closingTime: "11:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(212) 555-4567",
        priceRange: "$$",
        additional: "Dine-in and takeout available."
    },

    "104-01 Foster Avenue Coffee Shop": {
        description: "A neighborhood coffee shop serving coffee, light meals, and refreshments in a casual setting.",
        address: "104-01 Foster Avenue, Brooklyn, New York",
        openingTime: "6:00 AM",
        closingTime: "8:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(718) 555-5678",
        priceRange: "$",
        additional: "Coffee, light meals, dine-in, and takeout available."
    },


    // =====================================
    // BEST QUALITY RESTAURANTS
    // =====================================

    "B66 Club": {
        description: "A Brooklyn restaurant listed under Russian cuisine, offering a casual dining experience.",
        address: "66 Greenpoint Avenue, Brooklyn, New York 11222",
        openingTime: "11:00 AM",
        closingTime: "10:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(718) 555-2101",
        priceRange: "$$",
        additional: "Sample information includes dine-in service and a relaxed setting for casual meals."
    },

    "Bagel Shoppe": {
        description: "A Queens establishment specializing in bagels, pretzels, and convenient breakfast options.",
        address: "125 Queens Boulevard, Queens, New York 11375",
        openingTime: "6:00 AM",
        closingTime: "7:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(718) 555-2102",
        priceRange: "$",
        additional: "Sample information includes breakfast, takeaway orders, and quick snacks."
    },

    "Belaire Cafe": {
        description: "A Manhattan cafe listed under American cuisine, suitable for casual everyday dining.",
        address: "245 Madison Avenue, New York, New York 10016",
        openingTime: "7:00 AM",
        closingTime: "9:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(212) 555-2103",
        priceRange: "$$",
        additional: "Sample information includes a relaxed setting for breakfast, lunch, and casual meetups."
    },

    "Brooklyn Diner": {
        description: "A diner-style restaurant listed under American cuisine, offering a familiar and welcoming dining atmosphere.",
        address: "212 West 57th Street, New York, New York 10019",
        openingTime: "8:00 AM",
        closingTime: "11:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(212) 555-2104",
        priceRange: "$$",
        additional: "Sample information includes breakfast, lunch, dinner, and casual dining."
    },

    "Cambridge Caterers": {
        description: "A Manhattan establishment listed under American cuisine, with a name suggesting catering services.",
        address: "350 West 42nd Street, New York, New York 10036",
        openingTime: "8:00 AM",
        closingTime: "6:00 PM",
        daysOpen: "Monday - Saturday",
        contact: "(212) 555-2105",
        priceRange: "$$",
        additional: "Sample information includes catering inquiries, group orders, and event food services."
    },

    "Circle In The Square Theatre": {
        description: "A Manhattan theatre venue that appears under American cuisine in your restaurant dataset.",
        address: "235 West 50th Street, New York, New York 10019",
        openingTime: "10:00 AM",
        closingTime: "10:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(212) 555-2106",
        priceRange: "$$",
        additional: "Check performance schedules and visitor information. Food service details should be confirmed separately."
    }

};

// ======================================
// MOBILE NAVIGATION
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // Home
    if (document.getElementById("featuredRestaurants")) {
        loadFeaturedRestaurants();
    }

    // Restaurants
    if (document.getElementById("restaurantList")) {
        setupFilters();
        loadRestaurantFilterOptions();
        loadRestaurants();
    }

    // Best Quality
    if (document.getElementById("bestQualityList")) {
        loadBestQuality();
    }

});


// ===============================
// FEATURED RESTAURANTS
// ===============================

async function loadFeaturedRestaurants() {

    const container =
        document.getElementById("featuredRestaurants");

    if (!container) return;

    try {

        const response = await fetch(
            "/api/restaurants?unique=true&limit=6"
        );

        if (!response.ok) {
            throw new Error("Failed to load restaurants.");
        }

        const restaurants = await response.json();

        displayFeaturedRestaurants(
            restaurants,
            container
        );

    } catch (error) {

        console.error(error);

        container.innerHTML =
            "<p>Failed to load restaurants.</p>";

    }
}


 // ===============================
// LOAD BOROUGH AND CUISINE OPTIONS
// ===============================

async function loadRestaurantFilterOptions() {
    try {
        const response = await fetch("/api/restaurant-filters");

        if (!response.ok) {
            throw new Error("Failed to load filter options.");
        }

        const filters = await response.json();

        populateFilterOptions(
            "boroughFilter",
            filters.boroughs,
            "All Boroughs"
        );

        populateFilterOptions(
            "cuisine",
            filters.cuisines,
            "All Cuisines"
        );

    } catch (error) {
        console.error("Error loading filter options:", error);
    }
}

function populateFilterOptions(elementId, options, defaultText) {
    const dropdown = document.getElementById(elementId);

    if (!dropdown) return;

    const previousValue = dropdown.value;

    // Keep the default option and remove old dynamic options.
    dropdown.replaceChildren();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = defaultText;
    dropdown.appendChild(defaultOption);

    options.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        dropdown.appendChild(option);
    });

    // Preserve the selected filter if it still exists.
    if (options.includes(previousValue)) {
        dropdown.value = previousValue;
    }
}


// ===============================
// FILTER SETUP
// ===============================

function setupFilters() {
    document.getElementById("nameFilter")?.addEventListener("input", loadRestaurants);

    document.getElementById("boroughFilter")?.addEventListener("change", loadRestaurants);

    document.getElementById("cuisine")?.addEventListener("change", loadRestaurants);

    document.getElementById("gradeFilter")?.addEventListener("change", loadRestaurants);

    document.getElementById("maxScoreFilter")?.addEventListener("input", loadRestaurants);

    document.getElementById("resetFilters")?.addEventListener("click", resetFilters);
}


// ===============================
// LOAD RESTAURANTS
// ===============================

async function loadRestaurants() {

    const results =
        document.getElementById("restaurantList");

    if (!results) return;


    const name =
        document.getElementById("nameFilter")?.value.trim();

    const borough =
        document.getElementById("boroughFilter")?.value;

    const cuisine = 
        document.getElementById("cuisine")?.value;

    const grade =
        document.getElementById("gradeFilter")?.value;

    const maxScore =
        document.getElementById("maxScoreFilter")?.value;


    results.innerHTML =
        "<p>Loading restaurants...</p>";


    const params = new URLSearchParams();


    if (name)
        params.append("name", name);

    if (borough)
        params.append("borough", borough);

    if (cuisine)
        params.append("cuisine", cuisine);

    if (grade)
        params.append("grade", grade);

    if (maxScore)
        params.append("maxScore", maxScore);


    try {

        const response = await fetch(
            `/api/restaurants?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error("Failed to retrieve restaurants.");
        }

        const restaurants = await response.json();


        // Count
        const count =
            document.getElementById("restaurantCount");

        if (count) {
            count.textContent =
                `${restaurants.length} restaurants found`;
        }


        results.innerHTML = "";


        if (restaurants.length === 0) {

            results.innerHTML =
                "<p>No matching restaurants found.</p>";

            return;
        }


        displayRestaurants(
            restaurants,
            results
        );

    } catch (error) {

        console.error(error);

        results.innerHTML =
            "<p>Failed to retrieve restaurants.</p>";

    }
}

// ===============================
// DISPLAY FEATURED RESTAURANTS
// ===============================

function displayFeaturedRestaurants(
    restaurants,
    container
) {

    container.innerHTML = "";

    restaurants.forEach(
        (restaurant, index) => {

            const card =
                document.createElement("div");

            card.className =
                "restaurant-card";


            const image =
                foodImages[
                    index % foodImages.length
                ];


            const grade =
                restaurant.grade || "N/A";


            const gradeClass =
                ["A", "B", "C"].includes(grade)
                    ? `grade-${grade}`
                    : "grade-other";


            card.innerHTML = `

                <div class="card-img-container">

                    <img
                        src="${image}"
                        alt="${restaurant.name || "Restaurant"}"
                        class="card-img"
                    >

                    <div class="card-badges">

                        <span class="badge badge-grade ${gradeClass}">
                            Grade ${grade}
                        </span>

                        <span class="badge badge-score">
                            Score ${restaurant.score ?? "N/A"}
                        </span>

                    </div>

                </div>


                <div class="card-body">

                    <h3>
                        ${restaurant.name || "Unnamed Restaurant"}
                    </h3>

                    <p class="card-cuisine">
                        ${restaurant.cuisine || "N/A"}
                    </p>

                    <p class="card-borough">
                        ${restaurant.borough || "N/A"}
                    </p>

                </div>

            `;


            card.addEventListener("click", () => {

                openRestaurantModal(
                    restaurant,
                    image
                );

            });


            container.appendChild(card);

        }
    );
}

// ===============================
// DISPLAY RESTAURANTS
// ===============================

function displayRestaurants(
    restaurants,
    container
) {

    container.innerHTML = "";


    restaurants.forEach(
        (restaurant, index) => {

            const card =
                document.createElement("div");

            card.className =
                "restaurant-card";


            const image =
                foodImages[
                    index % foodImages.length
                ];


            const grade =
                restaurant.grade || "N/A";


            const gradeClass =
                ["A", "B", "C"].includes(grade)
                    ? `grade-${grade}`
                    : "grade-other";


            card.innerHTML = `

                <div class="card-img-container">

                    <img
                        src="${image}"
                        alt="${restaurant.name || "Restaurant"}"
                        class="card-img"
                    >

                    <div class="card-badges">

                        <span class="badge badge-grade ${gradeClass}">
                            Grade ${grade}
                        </span>

                        <span class="badge badge-score">
                            Score ${restaurant.score ?? "N/A"}
                        </span>

                    </div>

                </div>


                <div class="card-body">

                    <h3>
                        ${restaurant.name || "Unnamed Restaurant"}
                    </h3>

                    <p class="card-cuisine">
                        ${restaurant.cuisine || "N/A"}
                    </p>

                    <p class="card-borough">
                        📍 ${restaurant.borough || "N/A"}
                    </p>

                </div>

            `;


            container.appendChild(card);

        }
    );
}

// ===============================
// RESTAURANT DETAILS MODAL
// ===============================

function openRestaurantModal(restaurant, image) {

    const modal =
        document.getElementById("restaurantModal");

    if (!modal) return;


    // BASIC INFORMATION

    document.getElementById("restaurantModalImage").src =
        image;

    document.getElementById("restaurantModalImage").alt =
        restaurant.name || "Restaurant";

    document.getElementById("restaurantModalName").textContent =
        restaurant.name || "Unnamed Restaurant";


    // GRADE

    const grade =
        restaurant.grade || "N/A";

    const gradeElement =
        document.getElementById("restaurantModalGrade");

    gradeElement.textContent =
        `Grade ${grade}`;

    gradeElement.className =
        `badge badge-grade ${
            ["A", "B", "C"].includes(grade)
                ? `grade-${grade}`
                : "grade-other"
        }`;


    // SCORE

    document.getElementById("restaurantModalScore").textContent =
        `Score ${restaurant.score ?? "N/A"}`;


    // CUISINE

    document.getElementById("restaurantModalCuisine").textContent =
        (restaurant.cuisine || "N/A").trim();


    // LOCATION

    document.getElementById("restaurantModalLocation").textContent =
        restaurant.borough || "N/A";


    // DATABASE ADDRESS

    const address = restaurant.address;

    let addressText = "N/A";

    if (address && typeof address === "object") {

        addressText = [
            address.building,
            address.street,
            address.zipcode
        ]
            .filter(Boolean)
            .join(", ") || "N/A";

    } else if (address) {

        addressText = address;

    }


    // MATCH RESTAURANT DETAILS

    const restaurantName =
        (restaurant.name || "").trim();

    const info =
        featuredInfo[restaurantName];


    // DESCRIPTION

    document.getElementById("restaurantModalDescription").textContent =
        info?.description || "Restaurant information is not available.";


    // ADDRESS

    document.getElementById("restaurantModalAddress").textContent =
        info?.address || addressText;


    // OPENING HOURS

    const openingTime = info?.openingTime;
    const closingTime = info?.closingTime;

    document.getElementById("restaurantModalHours").textContent =
        openingTime && closingTime
            ? `${openingTime} - ${closingTime}`
            : "Not available";


    // DAYS OPEN

    document.getElementById("restaurantModalDays").textContent =
        info?.daysOpen || "Not available";


    // CONTACT

    document.getElementById("restaurantModalContact").textContent =
        info?.contact || "Not available";


    // PRICE RANGE

    document.getElementById("restaurantModalPrice").textContent =
        info?.priceRange || "Not available";


    // ADDITIONAL INFORMATION

    document.getElementById("restaurantModalAdditional").textContent =
        info?.additional || "No additional information available.";


    // OPEN MODAL

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Load the selected restaurant's map.
    if (typeof showRestaurantMap === "function") {
        showRestaurantMap(restaurant);
    }
}


 // ===============================
// RESTAURANT MODAL CLOSE
// ===============================

function closeRestaurantModal() {
    const modal = document.getElementById("restaurantModal");

    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}


// ===============================
// MODAL CLOSE EVENTS
// ===============================

document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("restaurantModalClose");
    const overlay = document.getElementById("restaurantModalOverlay");

    if (closeButton) {
        closeButton.addEventListener("click", closeRestaurantModal);
    }

    if (overlay) {
        overlay.addEventListener("click", closeRestaurantModal);
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeRestaurantModal();
        }
    });
});



 // ===============================
// BEST QUALITY
// ===============================

async function loadBestQuality() {
    const container = document.getElementById("bestQualityList");

    if (!container) return;

    container.innerHTML = "<p>Loading quality restaurants...</p>";

    try {
        const response = await fetch(
            "/api/restaurants?grade=A&unique=true&sort=score&limit=6"
        );

        if (!response.ok) {
            throw new Error("Failed to load quality restaurants.");
        }

        const restaurants = await response.json();

        container.innerHTML = "";

        if (restaurants.length === 0) {
            container.innerHTML = "<p>No quality restaurants found.</p>";
            return;
        }

        const count = document.getElementById("bestQualityCount");

        if (count) {
            count.textContent = `${restaurants.length} restaurants`;
        }

        displayBestQualityRestaurants(restaurants, container);

    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Failed to load quality restaurants.</p>";
    }
}


// ===============================
// DISPLAY BEST QUALITY RESTAURANTS
// ===============================

function displayBestQualityRestaurants(restaurants, container) {
    container.innerHTML = "";

    restaurants.forEach((restaurant, index) => {
        const card = document.createElement("div");
        card.className = "restaurant-card";

        const image = foodImages[index % foodImages.length];
        const grade = restaurant.grade || "N/A";

        const gradeClass = ["A", "B", "C"].includes(grade)
            ? `grade-${grade}`
            : "grade-other";

        card.innerHTML = `
            <div class="card-img-container">
                <img
                    src="${image}"
                    alt="${restaurant.name || "Restaurant"}"
                    class="card-img"
                >
                <div class="card-badges">
                    <span class="badge badge-grade ${gradeClass}">
                        Grade ${grade}
                    </span>
                    <span class="badge badge-score">
                        Score ${restaurant.score ?? "N/A"}
                    </span>
                </div>
            </div>

            <div class="card-body">
                <h3>${restaurant.name || "Unnamed Restaurant"}</h3>
                <p class="card-cuisine">${restaurant.cuisine || "N/A"}</p>
                <p class="card-borough">${restaurant.borough || "N/A"}</p>
            </div>
        `;

        card.style.cursor = "pointer";

        card.addEventListener("click", () => {
            openRestaurantModal(restaurant, image);
        });

        container.appendChild(card);
    });
}



// ===============================
// RESET FILTERS
// ===============================

function resetFilters() {

    document.getElementById("nameFilter").value = "";
    document.getElementById("boroughFilter").value = "";
    document.getElementById("cuisine").value = "";
    document.getElementById("gradeFilter").value = "";
    document.getElementById("maxScoreFilter").value = "";

    loadRestaurants();
}