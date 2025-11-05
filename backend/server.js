const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to PostgreSQL
console.log("Connecting to PostgreSQL...");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

// Make pool accessible in routes
app.set("pool", pool);

// API routes
app.use("/api/auth", require("./routes/auth")); // Authentication routes (register, login)
app.use("/api/chat", require("./routes/chat")); // Chat routes (query LLM, manage conversations)

// Define the server port
const PORT = process.env.PORT || 8000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
