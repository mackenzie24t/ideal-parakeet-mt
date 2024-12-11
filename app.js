// Load environment variables
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const uri = `mongodb+srv://macthompson2002:${process.env.MONGO_PWD}@cluster0.4x7x5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

if (!process.env.MONGO_PWD) {
    throw new Error("Missing environment variable: MONGO_PWD");
}

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Initialize MongoClient
let client;
(async () => {
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
})();

// Routes
app.get('/', async (req, res) => {
    try {
        const collection = client.db("sandwich").collection("ingredient");
        const result = await collection.find({}).toArray();
        res.render('index', { ingData: result });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/insert', async (req, res) => {
    try {
        const { field, value } = req.body;
        if (!field || !value) {
            return res.status(400).send("Invalid input data");
        }

        const collection = client.db("sandwich").collection("ingredient");
        await collection.insertOne({ [field]: value });
        res.redirect('/');
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/update', async (req, res) => {
    try {
        const { ingID, field, value } = req.body;
        if (!ingID || !field || !value) {
            return res.status(400).send("Invalid input data");
        }

        const collection = client.db("sandwich").collection("ingredient");
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(ingID) },
            { $set: { [field]: value } }
        );

        if (!result.value) {
            return res.status(404).send("Ingredient not found");
        }

        res.redirect('/');
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("Invalid ID");
        }

        const collection = client.db("sandwich").collection("ingredient");
        const result = await collection.findOneAndDelete({ _id: new ObjectId(id) });

        if (!result.value) {
            return res.status(404).send("Ingredient not found");
        }

        res.redirect('/');
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running & listening on port ${PORT}`);
});
