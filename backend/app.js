const express = require("express");
const mongooseData = require("./mongoose");
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware to handle CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.post("/register", mongooseData.createUser);
app.post("/login", mongooseData.login);
app.post("/helpform", mongooseData.HelpCase);
app.get("/helpothers", mongooseData.retrieveHelpsData);
app.patch("/responses", mongooseData.UpdatingData);

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
