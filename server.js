// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stockRoutes = require("./routes/stockRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api/stock", stockRoutes);

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

module.exports = startServer;