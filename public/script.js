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

    // Home
    if (document.getElementById("featuredRestaurants")) {
        loadFeaturedRestaurants();
    }

    // Restaurants
    if (document.getElementById("restaurantList")) {
        setupFilters();
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

        displayRestaurants(
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
// BEST QUALITY
// ===============================

async function loadBestQuality() {

    const container =
        document.getElementById("bestQualityList");

    if (!container) return;


    container.innerHTML =
        "<p>Loading quality restaurants...</p>";


    try {

        const response = await fetch(
            "/api/restaurants?grade=A&unique=true&sort=score&limit=6"
        );

        if (!response.ok) {
            throw new Error("Failed to load quality restaurants.");
        }

        const restaurants =
            await response.json();


        container.innerHTML = "";


        if (restaurants.length === 0) {

            container.innerHTML =
                "<p>No quality restaurants found.</p>";

            return;
        }


        const count =
            document.getElementById("bestQualityCount");

        if (count) {
            count.textContent =
                `${restaurants.length} restaurants`;
        }


        displayRestaurants(
            restaurants,
            container
        );

    } catch (error) {

        console.error(error);

        container.innerHTML =
            "<p>Failed to load quality restaurants.</p>";

    }
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