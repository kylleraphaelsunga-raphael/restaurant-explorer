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

    "(Lewis Drug Store) Locanda Vini E Olii": {
        description: "An Italian restaurant specializing in traditional Tuscan cuisine, freshly made pasta, antipasti, and Italian wines.",
        address: "129 Gates Avenue, Brooklyn, NY 11238",
        openingTime: "5:00 PM",
        closingTime: "10:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(718) 622-9202",
        priceRange: "$40 - $100",
        additional: "Opened in 2001 in a former neighborhood pharmacy dating back to 1896. The restaurant preserves much of the original woodwork and cabinetry. Owner and chef Michele Baldacci specializes in traditional Tuscan cuisine."
    },

    "1 East 66Th Street Kitchen": {
        description: "An American-style dining facility located within a residential cooperative building on Manhattan's Upper East Side.",
        address: "1 East 66th Street, New York, NY 10065",
        openingTime: "Not available",
        closingTime: "Not available",
        daysOpen: "Not available",
        contact: "Not available",
        priceRange: "Not available",
        additional: "Located in a residential building on the Upper East Side of Manhattan. Public information about its operating hours, menu, pricing, and contact details could not be confirmed. Contact the building or establishment directly for visitor information."
    },

    "101 Deli": {
        description: "A neighborhood deli offering sandwiches, breakfast items, freshly baked bread, convenience foods, and pickup or delivery options.",
        address: "100-16 Rockaway Beach Boulevard, Rockaway Park, Queens, NY 11694",
        openingTime: "6:00 AM",
        closingTime: "8:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(718) 634-1121",
        priceRange: "$10 - $20",
        additional: "Known for generously filled sandwiches, freshly baked bread, and breakfast options. The Rockaway Times reported that the business announced its closure on October 12, 2025. Its current operating status should be verified before visiting."
    },

    "101 Restaurant And Bar": {
        description: "A restaurant serving Southern-inspired American cuisine, including smoked pork, chicken wings, salads, and classic side dishes.",
        address: "1 West Street, Pittsfield, MA 01201",
        openingTime: "Breakfast: 6:30 AM - 10:30 AM daily\nDinner: 5:00 PM - 9:00 PM Monday - Thursday\nDinner: 5:00 PM - 10:00 PM Friday - Saturday",
        closingTime: "",
        daysOpen: "Breakfast daily; dinner Monday - Saturday",
        contact: "(413) 553-2251",
        priceRange: "$10 - $30",
        additional: "Offers breakfast and dinner with a menu focused on Southern-inspired American dishes. Confirm current operating hours and menu availability before visiting."
    },

    "1020 Bar": {
        description: "A neighborhood bar known for its casual atmosphere, pool table, darts, and popularity among Columbia University students and local residents.",
        address: "1020 Amsterdam Avenue, New York, NY 10025",
        openingTime: "4:00 PM",
        closingTime: "Not available",
        daysOpen: "Daily",
        contact: "(212) 531-3468",
        priceRange: "$10 - $20",
        additional: "Features a dimly lit barroom, budget-friendly drinks, darts, and pool. Popular with college students and neighborhood residents. Confirm closing time directly with the establishment."
    },

    "104-01 Foster Avenue Coffee Shop": {
        description: "A coffee shop or casual dining establishment listed in the restaurant dataset. Specific menu items and services could not be independently confirmed.",
        address: "104-01 Foster Avenue, Brooklyn, NY",
        openingTime: "Not available",
        closingTime: "Not available",
        daysOpen: "Not available",
        contact: "Not available",
        priceRange: "Not available",
        additional: "The restaurant dataset includes this establishment under its listed name. Current business details, including its menu, operating hours, contact number, and availability of dine-in or takeaway service, could not be confirmed."
    },


    // =====================================
    // BEST QUALITY RESTAURANTS
    // =====================================

    "B66 Club": {
        description: "A spacious dance club and event venue in Brooklyn featuring a dance floor, two bars, a VIP section, and pool tables.",
        address: "6612 New Utrecht Avenue, Brooklyn, NY 11219",
        openingTime: "9:00 PM",
        closingTime: "4:00 AM (next day)",
        daysOpen: "Friday - Saturday",
        contact: "(917) 975-2254",
        priceRange: "$$ - Moderate (drinks about $7–$15+)",
        additional: "Offers a dance floor, bars, VIP area, pool tables, outdoor seating, and private event rentals. Accepts credit cards and provides wheelchair access. Guests must be 21 or older and present a valid government-issued ID."
    },

    "Bagel Shoppe": {
        description: "A neighborhood bagel shop offering assorted bagels, flavored cream cheeses, breakfast sandwiches, deli sandwiches, and coffee.",
        address: "215-03 73rd Avenue, Oakland Gardens, Queens, NY 11364",
        openingTime: "5:00 AM",
        closingTime: "4:00 PM",
        daysOpen: "Monday - Sunday",
        contact: "(718) 423-6692",
        priceRange: "$ - Inexpensive (estimated $2–$15)",
        additional: "Offers takeout and several vegetarian options. Android Pay is listed among its payment options."
    },

    "Belaire Cafe": {
        description: "A casual cafeteria-style cafe on Manhattan's Upper East Side serving coffee, breakfast, and prepared meals.",
        address: "525 East 71st Street, New York, NY 10021",
        openingTime: "7:00 AM",
        closingTime: "6:00 PM",
        daysOpen: "Monday - Friday; closed Saturday and Sunday",
        contact: "(212) 606-1980",
        priceRange: "$ - Inexpensive (estimated $2–$15)",
        additional: "Provides a casual dining option near the Hospital for Special Surgery (HSS). Garage parking is available nearby."
    },

    "Brooklyn Diner": {
        description: "A classic American diner serving all-day breakfast, burgers, comfort food, and desserts.",
        address: "212 West 57th Street, New York, NY 10019",
        openingTime: "8:00 AM",
        closingTime: "10:00 PM Sunday - Thursday; 11:00 PM Friday - Saturday",
        daysOpen: "Monday - Sunday",
        contact: "(212) 977-1957",
        priceRange: "$$$ - Moderately expensive (dishes about $14.50–$34+)",
        additional: "Accepts reservations and major credit cards. Delivery, takeout, and wheelchair access are available."
    },

    "Cambridge Caterers": {
        description: "A catering business offering breakfast trays, boxed lunches, sandwiches, buffets, and party platters for meetings and special events.",
        address: "21 West 38th Street, New York, NY 10018",
        openingTime: "7:00 AM",
        closingTime: "6:00 PM",
        daysOpen: "Monday - Friday; closed Saturday and Sunday",
        contact: "(212) 819-9130",
        priceRange: "$$ - Moderate ($6.50–$49.95+ per person, depending on package)",
        additional: "Offers vegetarian menu options and catering services for office meetings and events. Its website reportedly redirects to Metro Catering, so current business details should be confirmed directly."
    },

    "Circle In The Square Theatre": {
        description: "A Broadway theatre presenting plays and musicals, with an associated school offering professional acting and musical theatre training.",
        address: "235 West 50th Street, New York, NY 10019",
        openingTime: "10:00 AM Monday - Saturday; 12:00 PM Sunday",
        closingTime: "6:00 PM Monday and Sunday; 8:00 PM Tuesday - Saturday",
        daysOpen: "Monday - Sunday for the box office; performance schedules vary",
        contact: "(212) 664-1591 ext. 1 (theatre); (212) 307-0388 (school)",
        priceRange: "Varies by production; recent listings about $86–$327+ per ticket",
        additional: "Offers wheelchair-accessible seating, elevator access, and assistive listening devices. Tickets are available through Telecharge or the theatre's box office. Sunday and holiday hours may vary."
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
        `badge badge-grade ${["A", "B", "C"].includes(grade)
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


    const restaurantName = (restaurant.name || "").trim();

    const infoKey = restaurantName === "Lewis Drug Store"
        ? "Locanda Vini E Olii"
        : restaurantName;

    const info = featuredInfo[infoKey];


    // DESCRIPTION

    document.getElementById("restaurantModalDescription").textContent =
        info?.description || "Restaurant information is not available.";


    // ADDRESS

    document.getElementById("restaurantModalAddress").textContent =
        info?.address || addressText;


    // OPENING HOURS

    const hoursElement =
        document.getElementById("restaurantModalHours");

    hoursElement.textContent =
        info?.openingTime || "Not available";

    hoursElement.style.whiteSpace = "pre-line";


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