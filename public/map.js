
/* =====================================
   DINE & SEEK - RESTAURANT MAP
   Leaflet + OpenStreetMap
===================================== */

let restaurantMap = null;
let restaurantMarker = null;
let currentMapContainer = null;

const geocodedLocations = new Map();
let lastGeocodeTime = 0;

// Get the restaurant address from the MongoDB document.
// Do not use the sample addresses in featuredInfo.
function getMapAddress(restaurant) {
    const address = restaurant.address;

    let addressParts = [];

    if (address && typeof address === "object") {
        addressParts = [
            address.building,
            address.street,
            address.zipcode
        ].filter(Boolean);
    } else if (typeof address === "string") {
        addressParts = [address];
    }

    if (addressParts.length === 0) {
        return "";
    }

    return [
        addressParts.join(" "),
        restaurant.borough,
        "New York, NY, USA"
    ].filter(Boolean).join(", ");
}


// Respect OpenStreetMap's public geocoding rate limit.
function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


// Find the coordinates for the restaurant's database address.
async function findRestaurantCoordinates(address, restaurant) {
    const name = (restaurant.name || "").trim().toLowerCase();

    // Known OpenStreetMap location for Bagel Shoppe.
    if (name === "bagel shoppe") {
        return {
            lat: 40.74071,
            lon: -73.75911,
            displayName: "Bagel Shoppe, 215-03 73rd Avenue, Queens, NY 11364"
        };
    }

    // Try several address formats for other restaurants.
    const queries = [
        address,
        `${restaurant.name}, ${restaurant.borough}, New York, USA`
    ];

    if (name === "belaire cafe") {
        queries.unshift(
            "525 East 71st Street, Manhattan, New York, NY 10021, USA"
        );
    }

    if (name === "101 restaurant and bar") {
        queries.unshift(
            "10018 4th Avenue, Brooklyn, NY 11209, USA"
        );
    }

    for (const query of [...new Set(queries)]) {
        const cached = geocodedLocations.get(query);

        if (cached) {
            return cached;
        }

        const elapsed = Date.now() - lastGeocodeTime;

        if (elapsed < 1100) {
            await wait(1100 - elapsed);
        }

        const url = new URL(
            "https://nominatim.openstreetmap.org/search"
        );

        url.searchParams.set("format", "jsonv2");
        url.searchParams.set("q", query);
        url.searchParams.set("limit", "1");
        url.searchParams.set("countrycodes", "us");
        url.searchParams.set("addressdetails", "1");

        lastGeocodeTime = Date.now();

        try {
            const response = await fetch(url);

            if (!response.ok) continue;

            const results = await response.json();

            if (results.length > 0) {
                const result = results[0];

                const location = {
                    lat: Number(result.lat),
                    lon: Number(result.lon),
                    displayName: result.display_name
                };

                geocodedLocations.set(query, location);
                return location;
            }
        } catch (error) {
            console.error("Geocoding attempt failed:", error);
        }
    }

    return null;
}

// Display the map inside the restaurant modal.
async function showRestaurantMap(restaurant) {
    const mapElement = document.getElementById("restaurantMap");
    const statusElement = document.getElementById("restaurantMapStatus");
    const directionsLink = document.getElementById("restaurantDirectionsLink");

    if (!mapElement || !statusElement || !directionsLink) {
        console.error("Restaurant map HTML elements are missing.");
        return;
    }

    const address = getMapAddress(restaurant);

    // Reset the previous restaurant's directions.
    directionsLink.hidden = true;
    directionsLink.removeAttribute("href");

    if (!address) {
        statusElement.textContent =
            "No street address is available for this restaurant in the database.";

        if (restaurantMap) {
            restaurantMap.remove();
            restaurantMap = null;
            restaurantMarker = null;
            currentMapContainer = null;
        }

        mapElement.replaceChildren();
        return;
    }

    statusElement.textContent = "Finding restaurant location...";

    // Directions use the restaurant's database address.
    directionsLink.href =
        "https://www.google.com/maps/dir/?api=1&destination=" +
        encodeURIComponent(address);

    directionsLink.hidden = false;

    try {
        const location = await findRestaurantCoordinates(address, restaurant);

        if (!location) {
            statusElement.textContent =
                "No matching map location was found for this database address.";

            return;
        }

        statusElement.textContent =
            "Mapped address: " + location.displayName;

        // Create the map only once, then move its marker.
        if (!restaurantMap || currentMapContainer !== mapElement) {
            if (restaurantMap) {
                restaurantMap.remove();
            }

            restaurantMap = L.map(mapElement).setView(
                [location.lat, location.lon],
                16
            );

            currentMapContainer = mapElement;

            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    maxZoom: 19,
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                }
            ).addTo(restaurantMap);

            restaurantMarker = L.marker([
                location.lat,
                location.lon
            ]).addTo(restaurantMap);
        } else {
            restaurantMap.setView(
                [location.lat, location.lon],
                16
            );

            restaurantMarker.setLatLng([
                location.lat,
                location.lon
            ]);
        }

        restaurantMarker
            .bindPopup(
                `<strong>${escapeMapText(restaurant.name || "Restaurant")}</strong><br>${escapeMapText(location.displayName)}`
            )
            .openPopup();

        // The modal is visible now, so Leaflet can calculate its size.
        setTimeout(() => {
            if (restaurantMap) {
                restaurantMap.invalidateSize();
            }
        }, 150);

    } catch (error) {
        console.error("Restaurant map error:", error);

        statusElement.textContent =
            "The map could not load. Please check your internet connection and try again.";
    }
}


// Prevent restaurant names and addresses from being treated as HTML.
function escapeMapText(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}
