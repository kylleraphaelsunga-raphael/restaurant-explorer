const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public folder
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// MongoDB connection
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db;

const restaurantsCollection = () => db.collection("restaurants");

// Demo admin account
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// ======================================
// HELPER FUNCTIONS
// ======================================

function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getLatestInspection(restaurant) {
    if (!restaurant.grades || restaurant.grades.length === 0) {
        return {
            grade: "",
            score: ""
        };
    }

    const grades = [...restaurant.grades];

    grades.sort((a, b) => {
        return new Date(b.date || 0) - new Date(a.date || 0);
    });

    return {
        grade: grades[0].grade || "",
        score: grades[0].score ?? ""
    };
}

function formatAdminRestaurant(restaurant) {
    const latest = getLatestInspection(restaurant);

    return {
        _id: restaurant._id.toString(),
        name: restaurant.name || "",
        borough: restaurant.borough || "",
        cuisine: (restaurant.cuisine || "").trim(),
        grade: latest.grade,
        score: latest.score,
        restaurant_id: restaurant.restaurant_id ?? ""
    };
}

function isValidObjectId(id) {
    return ObjectId.isValid(id) &&
        new ObjectId(id).toString() === id;
}

function validateRestaurant(data) {
    const name = typeof data.name === "string"
        ? data.name.trim()
        : "";

    const borough = typeof data.borough === "string"
        ? data.borough.trim()
        : "";

    const cuisine = typeof data.cuisine === "string"
        ? data.cuisine.trim()
        : "";

    const grade = typeof data.grade === "string"
        ? data.grade.trim().toUpperCase()
        : "";

    const score = Number(data.score);

    if (!name || !borough || !cuisine || !grade) {
        return {
            error: "Please complete the restaurant name, borough, cuisine, and grade."
        };
    }

    if (!Number.isFinite(score) || score < 0) {
        return {
            error: "Please enter a valid score of 0 or higher."
        };
    }

    return {
        restaurant: {
            name,
            borough,
            cuisine,
            grade,
            score,
            restaurant_id:
                typeof data.restaurant_id === "string"
                    ? data.restaurant_id.trim()
                    : ""
        }
    };
}

// ======================================
// ADMIN LOGIN
// ======================================

app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body || {};

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {
        return res.json({
            success: true,
            message: "Admin login successful"
        });
    }

    return res.status(401).json({
        error: "Invalid username or password."
    });
});

// ======================================
// ADMIN: READ ALL RESTAURANTS
// ======================================

app.get("/api/admin/restaurants", async (req, res) => {
    try {
        const restaurants = await restaurantsCollection()
            .find({})
            .toArray();

        restaurants.sort((a, b) =>
            (a.name || "").localeCompare(b.name || "")
        );

        res.json(restaurants.map(formatAdminRestaurant));
    } catch (error) {
        console.error("Admin Read Error:", error);

        res.status(500).json({
            error: "Unable to load restaurants."
        });
    }
});

// ======================================
// ADMIN: CREATE RESTAURANT
// ======================================

app.post("/api/admin/restaurants", async (req, res) => {
    try {
        const result = validateRestaurant(req.body || {});

        if (result.error) {
            return res.status(400).json({
                error: result.error
            });
        }

        const restaurant = result.restaurant;

        const newRestaurant = {
            name: restaurant.name,
            borough: restaurant.borough,
            cuisine: restaurant.cuisine,
            grades: [
                {
                    grade: restaurant.grade,
                    score: restaurant.score,
                    date: new Date()
                }
            ]
        };

        // Include restaurant_id only when provided.
        if (restaurant.restaurant_id) {
            newRestaurant.restaurant_id = restaurant.restaurant_id;
        }

        const insertResult = await restaurantsCollection()
            .insertOne(newRestaurant);

        const created = await restaurantsCollection().findOne({
            _id: insertResult.insertedId
        });

        res.status(201).json({
            message: "Restaurant added successfully.",
            restaurant: formatAdminRestaurant(created)
        });
    } catch (error) {
        console.error("Admin Create Error:", error);

        res.status(500).json({
            error: "Unable to add restaurant."
        });
    }
});

// ======================================
// ADMIN: UPDATE RESTAURANT
// ======================================

app.put("/api/admin/restaurants/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                error: "Invalid restaurant ID."
            });
        }

        const result = validateRestaurant(req.body || {});

        if (result.error) {
            return res.status(400).json({
                error: result.error
            });
        }

        const restaurant = result.restaurant;
        const objectId = new ObjectId(id);

        const existing = await restaurantsCollection().findOne({
            _id: objectId
        });

        if (!existing) {
            return res.status(404).json({
                error: "Restaurant not found."
            });
        }

        const updateFields = {
            name: restaurant.name,
            borough: restaurant.borough,
            cuisine: restaurant.cuisine
        };

        if (restaurant.restaurant_id) {
            updateFields.restaurant_id = restaurant.restaurant_id;
        } else {
            updateFields.restaurant_id = "";
        }

        // Preserve inspection history.
        // Add a new inspection only if grade or score changed.
        const latest = getLatestInspection(existing);

        const gradeChanged =
            latest.grade !== restaurant.grade ||
            Number(latest.score) !== restaurant.score;

        const updateOperation = {
            $set: updateFields
        };

        if (gradeChanged) {
            updateOperation.$push = {
                grades: {
                    grade: restaurant.grade,
                    score: restaurant.score,
                    date: new Date()
                }
            };
        }

        await restaurantsCollection().updateOne(
            { _id: objectId },
            updateOperation
        );

        const updated = await restaurantsCollection().findOne({
            _id: objectId
        });

        res.json({
            message: "Restaurant updated successfully.",
            restaurant: formatAdminRestaurant(updated)
        });
    } catch (error) {
        console.error("Admin Update Error:", error);

        res.status(500).json({
            error: "Unable to update restaurant."
        });
    }
});

// ======================================
// ADMIN: DELETE RESTAURANT
// ======================================

app.delete("/api/admin/restaurants/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                error: "Invalid restaurant ID."
            });
        }

        const result = await restaurantsCollection().deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: "Restaurant not found."
            });
        }

        res.json({
            message: "Restaurant deleted successfully."
        });
    } catch (error) {
        console.error("Admin Delete Error:", error);

        res.status(500).json({
            error: "Unable to delete restaurant."
        });
    }
});

// ======================================
// PUBLIC: GET RESTAURANT FILTER OPTIONS
// ======================================

app.get("/api/restaurant-filters", async (req, res) => {
    try {
        const collection = restaurantsCollection();

        const [boroughValues, cuisineValues] = await Promise.all([
            collection.distinct("borough"),
            collection.distinct("cuisine")
        ]);

        // Remove empty values, trim spaces, remove duplicates,
        // and sort alphabetically.
        function cleanOptions(values) {
            return [...new Set(
                values
                    .filter(value => typeof value === "string")
                    .map(value => value.trim())
                    .filter(Boolean)
            )].sort((a, b) => a.localeCompare(b));
        }

        res.json({
            boroughs: cleanOptions(boroughValues),
            cuisines: cleanOptions(cuisineValues)
        });
    } catch (error) {
        console.error("Restaurant Filter Options Error:", error);

        res.status(500).json({
            error: "Unable to load restaurant filter options."
        });
    }
});

// ======================================
// PUBLIC: GET RESTAURANTS WITH FILTERS
// ======================================

app.get("/api/restaurants", async (req, res) => {
    try {
        const {
            name,
            borough,
            cuisine,
            grade,
            maxScore,
            unique,
            sort,
            limit
        } = req.query;

        const pipeline = [];
        const matchStage = {};

        if (name) {
            matchStage.name = {
                $regex: escapeRegex(name.trim()),
                $options: "i"
            };
        }

        if (borough) {
            matchStage.borough = {
                $regex: "^" + escapeRegex(borough.trim()) + "$",
                $options: "i"
            };
        }

        if (cuisine) {
            matchStage.cuisine = {
                $regex: "^" + escapeRegex(cuisine.trim()) + "$",
                $options: "i"
            };
        }

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        // Get the latest inspection for each restaurant.
        pipeline.push({ $unwind: "$grades" });
        pipeline.push({ $sort: { "grades.date": -1 } });

        pipeline.push({
            $group: {
                _id: "$_id",
                restaurant_id: { $first: "$restaurant_id" },
                name: { $first: "$name" },
                borough: { $first: "$borough" },
                cuisine: { $first: "$cuisine" },
                address: { $first: "$address" },
                grade: { $first: "$grades.grade" },
                score: { $first: "$grades.score" }
            }
        });

        const latestMatch = {};
        const scoreRule = {};

        if (grade) {
            latestMatch.grade = grade;
        }

        if (maxScore !== undefined && maxScore !== "") {
            const numericMaxScore = Number(maxScore);

            if (Number.isFinite(numericMaxScore)) {
                scoreRule.$lte = numericMaxScore;
            }
        }

        if (sort === "score") {
            scoreRule.$type = "number";
        }

        if (Object.keys(scoreRule).length > 0) {
            latestMatch.score = scoreRule;
        }

        if (Object.keys(latestMatch).length > 0) {
            pipeline.push({ $match: latestMatch });
        }

        const sortStage = sort === "score"
            ? { score: 1, name: 1 }
            : { name: 1 };

        pipeline.push({ $sort: sortStage });

        if (unique === "true") {
            pipeline.push({
                $group: {
                    _id: "$name",
                    doc: { $first: "$$ROOT" }
                }
            });

            pipeline.push({
                $replaceRoot: { newRoot: "$doc" }
            });

            pipeline.push({ $sort: sortStage });
        }

        const numericLimit = Number(limit);

        if (Number.isInteger(numericLimit) && numericLimit > 0) {
            pipeline.push({ $limit: numericLimit });
        }

        pipeline.push({
            $project: { _id: 0 }
        });

        const restaurants = await restaurantsCollection()
            .aggregate(pipeline, { allowDiskUse: true })
            .toArray();

        res.json(restaurants);
    } catch (error) {
        console.error("Public Restaurant API Error:", error);

        res.status(500).json({
            error: "Unable to load restaurant data from MongoDB."
        });
    }
});

// ======================================
// CONNECT TO MONGODB AND START SERVER
// ======================================

async function connectDB() {
    try {
        await client.connect();

        db = client.db("restaurantDB");

        console.log("Connected successfully to local MongoDB!");
        console.log("Database: restaurantDB");
        console.log("Collection: restaurants");

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}

connectDB();