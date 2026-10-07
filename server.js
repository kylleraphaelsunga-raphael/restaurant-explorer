const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

// Public folder
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// Local MongoDB Connection
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);
let db;

// Connect to Local MongoDB
async function connectDB() {
    try {
        await client.connect();

        db = client.db("restaurantDB");

        console.log("Connected successfully to local MongoDB!");
        console.log("Database: restaurantDB");
        console.log("Collection: restaurants");

    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
}

// Makes user text safe to use inside a regex
function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Get restaurants
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

        // Filters on the restaurant itself
        if (name) {
            matchStage.name = {
                $regex: escapeRegex(name.trim()),
                $options: "i"
            };
        }

        if (borough) {
            matchStage.borough = borough;
        }

        if (cuisine) {
            matchStage.cuisine = cuisine;
        }

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        // One row per inspection, newest first
        pipeline.push({ $unwind: "$grades" });
        pipeline.push({ $sort: { "grades.date": -1 } });

        // Keep only the latest inspection of each restaurant
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

        // Grade and score filters now use the latest inspection only
        const latestMatch = {};
        const scoreRule = {};

        if (grade) {
            latestMatch.grade = grade;
        }

        if (maxScore) {
            scoreRule.$lte = Number(maxScore);
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

        // Sorting
        const sortStage =
            sort === "score"
                ? { score: 1, name: 1 }
                : { name: 1 };

        pipeline.push({ $sort: sortStage });

        // Optional: one result per restaurant name
        if (unique === "true") {
            pipeline.push({
                $group: {
                    _id: "$name",
                    doc: { $first: "$$ROOT" }
                }
            });
            pipeline.push({ $replaceRoot: { newRoot: "$doc" } });
            pipeline.push({ $sort: sortStage });
        }

        // Optional: limit the number of results
        if (Number(limit) > 0) {
            pipeline.push({ $limit: Number(limit) });
        }

        pipeline.push({ $project: { _id: 0 } });

        const restaurants = await db
            .collection("restaurants")
            .aggregate(pipeline, { allowDiskUse: true })
            .toArray();

        res.json(restaurants);

    } catch (error) {
        console.error("API Error:", error);

        res.status(500).json({
            error: "Unable to load restaurant data from MongoDB"
        });
    }
});

// Connect to MongoDB first, then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(
            `🚀 Server running at http://localhost:${PORT}`
        );
    });
});