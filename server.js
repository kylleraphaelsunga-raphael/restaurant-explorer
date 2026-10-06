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

// Get restaurants
app.get("/api/restaurants", async (req, res) => {
    try {
        const {
            borough,
            cuisine,
            grade,
            maxScore
        } = req.query;

        const pipeline = [];
        const matchStage = {};

        // Filter by borough
        if (borough) {
            matchStage.borough = borough;
        }

        // Filter by cuisine
        if (cuisine) {
            matchStage.cuisine = cuisine;
        }

        // Apply borough and cuisine filters
        if (borough || cuisine) {
            pipeline.push({
                $match: matchStage
            });
        }

        // Access individual grade records
        pipeline.push({
            $unwind: "$grades"
        });

        // Grade and score filters
        if (grade || maxScore) {
            const gradeMatch = {};

            if (grade) {
                gradeMatch["grades.grade"] = grade;
            }

            if (maxScore) {
                gradeMatch["grades.score"] = {
                    $lte: Number(maxScore)
                };
            }

            pipeline.push({
                $match: gradeMatch
            });
        }

        // Select only the fields needed by the frontend
        pipeline.push({
            $project: {
                _id: 0,
                restaurant_id: 1,
                name: 1,
                borough: 1,
                cuisine: 1,
                address: 1,
                grade: "$grades.grade",
                score: "$grades.score"
            }
        });

        // Sort alphabetically
        pipeline.push({
            $sort: {
                name: 1
            }
        });

        // Get restaurant data from MongoDB
        const restaurants = await db
            .collection("restaurants")
            .aggregate(pipeline)
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