const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongokey';
const SERVER_PORT = 5050;

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then((client) => {
    console.log("✅ MongoDB connected");

    const db = client.db("food");
    const collection = db.collection("food");

    // Example: Get all users (for demonstration)
    app.get("/users", async (req, res) => {
      try {
        const users = await collection.find().toArray();
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Example: Add a new user (for demonstration)
    app.post("/signup", async (req, res) => {
      try {
        const { username, password } = req.body;
        if (!username || !password)
          return res.status(400).json({ message: 'Username and password required' });

        const existing = await collection.findOne({ username });
        if (existing) {
          return res.status(409).json({ message: 'Username already exists' });
        }
        const newUser = { username, password };
        await collection.insertOne(newUser);
        res.json({ message: 'Signup successful' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Login endpoint
    app.post("/login", async (req, res) => {
      try {
        const { username, password } = req.body;
        if (!username || !password)
          return res.status(400).json({ message: 'Username and password required' });

        const user = await collection.findOne({ username, password });
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.listen(SERVER_PORT, () => {
      console.log(`🚀 Server running at http://localhost:${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
