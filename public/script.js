// ===============================
// RESTAURANT IMAGES
// ===============================

const foodImages = [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80"
];


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    loadFeaturedRestaurants();
});


// ===============================
// PAGE NAVIGATION
// ===============================

function showView(viewName) {

    const views =
        document.querySelectorAll(".page-view");

    const navLinks =
        document.querySelectorAll(".nav-link");


    // Hide all pages
    views.forEach(view => {
        view.classList.add("hidden");
    });


    // Remove active navigation
    navLinks.forEach(link => {
        link.classList.remove("active");
    });


    // Home
    if (viewName === "home") {

        document
            .getElementById("home-view")
            .classList.remove("hidden");

        navLinks[0].classList.add("active");
    }


    // About
    else if (viewName === "about") {

        document
            .getElementById("about-view")
            .classList.remove("hidden");

        navLinks[1].classList.add("active");
    }


    // Restaurants
    else if (viewName === "restaurants") {

        document
            .getElementById("restaurants-view")
            .classList.remove("hidden");

        navLinks[2].classList.add("active");

        loadRestaurants();
    }


    // Best Quality
    else if (viewName === "best-quality") {

        document
            .getElementById("best-quality-view")
            .classList.remove("hidden");

        navLinks[3].classList.add("active");

        loadBestQuality();
    }


    // Admin
    else if (viewName === "admin") {

        document
            .getElementById("admin-view")
            .classList.remove("hidden");

    }
}


// ===============================
// FEATURED RESTAURANTS
// ===============================

async function loadFeaturedRestaurants() {
    const featuredGrid = document.getElementById("featured-grid");
    const countText = document.getElementById("featured-count-text");

    try {
        const response = await fetch("/api/restaurants");

        if (!response.ok) {
            throw new Error("Failed to load restaurants.");
        }

        const restaurants = await response.json();

        // Only remove duplicates for the Featured Restaurants section
        const featured = [];
        const seenNames = new Set();

        for (const restaurant of restaurants) {
            if (!seenNames.has(restaurant.name)) {
                seenNames.add(restaurant.name);
                featured.push(restaurant);
            }

            if (featured.length === 6) {
                break;
            }
        }

        featuredGrid.innerHTML = "";

        countText.textContent =
            `${featured.length} featured restaurants`;

        displayRestaurants(featured, featuredGrid);

    } catch (error) {
        console.error("Error loading featured restaurants:", error);
        countText.textContent = "Error loading restaurants.";
    }
}


// ===============================
// LOAD RESTAURANTS
// ===============================

async function loadRestaurants() {

    const borough =
        document.getElementById("borough").value;


    const cuisine =
        document.getElementById("cuisine").value;


    const grade =
        document.getElementById("grade").value;


    const maxScore =
        document.getElementById("maxScore").value;


    const results =
        document.getElementById("results");


    // Show loading message
    results.innerHTML =
        "<p>Loading restaurants...</p>";


    // Create URL parameters
    const params =
        new URLSearchParams();


    // Borough filter
    if (borough) {

        params.append(
            "borough",
            borough
        );

    }


    // Cuisine filter
    if (cuisine) {

        params.append(
            "cuisine",
            cuisine
        );

    }


    // Grade filter
    if (grade) {

        params.append(
            "grade",
            grade
        );

    }


    // Maximum Score filter
    if (maxScore) {

        params.append(
            "maxScore",
            maxScore
        );

    }


    console.log(
        "API Request:",
        `/api/restaurants?${params.toString()}`
    );


    try {

        const response =
            await fetch(
                `/api/restaurants?${params.toString()}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to retrieve restaurant data."
            );

        }


        const restaurants =
            await response.json();


        // Update result count
        document.getElementById(
            "results-count"
        ).textContent =
            `${restaurants.length} found`;


        // Clear previous results
        results.innerHTML = "";


        // No results
        if (restaurants.length === 0) {

            results.innerHTML =
                "<p>No matching restaurants found.</p>";

            return;
        }


        // Display restaurants
        displayRestaurants(
            restaurants,
            results
        );

    }

    catch (error) {

        console.error(
            "Error loading restaurants:",
            error
        );


        results.innerHTML =
            "<p>Failed to retrieve restaurants.</p>";

    }
}


// ===============================
// DISPLAY RESTAURANTS
// ===============================

function displayRestaurants(
    restaurants,
    container = document.getElementById("results")
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


            card.innerHTML = `

                <div class="card-img-container">

                    <img
                        src="${image}"
                        alt="${restaurant.name || "Restaurant"}"
                        class="card-img"
                    >

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


                    <div class="card-meta">

                        <span class="badge badge-grade">
                            Grade:
                            ${restaurant.grade || "N/A"}
                        </span>


                        <span class="badge badge-score">
                            Score:
                            ${restaurant.score ?? "N/A"}
                        </span>

                    </div>

                </div>

            `;


            container.appendChild(card);

        }
    );
}


// ===============================
// BEST QUALITY
// ===============================

async function loadBestQuality() {
    const container = document.getElementById("quality-results");

    container.innerHTML = "<p>Loading quality restaurants...</p>";

    try {
        const response = await fetch("/api/restaurants?grade=A");

        if (!response.ok) {
            throw new Error("Failed to load Grade A restaurants.");
        }

        const restaurants = await response.json();

        // Remove duplicate restaurant names
        const uniqueRestaurants = [];
        const seenNames = new Set();

        for (const restaurant of restaurants) {
            if (!seenNames.has(restaurant.name)) {
                seenNames.add(restaurant.name);
                uniqueRestaurants.push(restaurant);
            }
        }

        // Sort by lowest score first
        uniqueRestaurants.sort((a, b) => {
            return (a.score ?? 999) - (b.score ?? 999);
        });

        // Get the 6 best restaurants
        const bestRestaurants = uniqueRestaurants.slice(0, 6);

        container.innerHTML = "";

        displayRestaurants(
            bestRestaurants,
            container
        );

    } catch (error) {
        console.error("Error loading best quality restaurants:", error);
        container.innerHTML = "<p>Failed to load quality restaurants.</p>";
    }
}


// ===============================
// RESET FILTERS
// ===============================

function resetFilters() {

    document.getElementById(
        "borough"
    ).value = "";


    document.getElementById(
        "cuisine"
    ).value = "";


    document.getElementById(
        "grade"
    ).value = "";


    document.getElementById(
        "maxScore"
    ).value = "";


    loadRestaurants();
}
