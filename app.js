// app.js
const dotenv = require("dotenv");
const connectDB = require("./db");
const startServer = require("./server");

dotenv.config();

// Connect to the database
connectDB(process.env.MONGO_URI);

// Start the server
const PORT = process.env.PORT || 5000;
startServer(PORT);