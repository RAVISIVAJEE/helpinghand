const express = require("express");

const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserCredentials = require("./models/Help");
const UserData = require("./models/HelpForm");
mongoose
  .connect(
    "mongodb+srv://sivaraavi9544:6304461665Siva@cluster0.ypddrxa.mongodb.net/Help_EachOther?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("connection not established");
    console.log(error);
  });

const createUser = async (req, res, next) => {
  const newUser = new UserCredentials({
    id: uuidv4(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  });

  const result = await newUser.save();
  console.log("User created successfully");
  res.json({ message: "User created successfully", data: result });
};

// Route for handling login requests
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await UserCredentials.findOne({ username });

    // If user not found
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If passwords match, login successful
    res.json({ message: "Login successful", userId: user.id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const HelpCase = async (req, res, next) => {
  const { id, name, category, description, pay, location, address, contact } =
    req.body.usecase;
  const { latitude, longitude } = location;

  const newUseCase = new UserData({
    id,
    name,
    category,
    description,
    pay,
    contact,
    location: {
      lat: latitude,
      long: longitude,
    },
    address,
  });

  const result = await newUseCase.save();

  res.json({ message: "new usecase data added", data: result });
};

const retrieveHelpsData = async (req, res, next) => {
  try {
    // Retrieve all documents from UserData collection
    const allUserNeeds = await UserData.find({}).exec();
    console.log("Retrieved User Data:", allUserNeeds);
    res.json({ data: allUserNeeds });
  } catch (error) {
    console.error("Error retrieving UserData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdatingData = async (req, res, next) => {
  const { id, singleRow } = req.body;

  console.log("id is ", id);
  console.log("singleRow is ", singleRow);

  try {
    // Find and update the document with the matching ID
    const updatedData = await UserData.findOneAndUpdate(
      { id },
      { $set: singleRow },
      { new: true } // Return the updated document
    );

    if (updatedData) {
      res
        .status(200)
        .json({ message: "Database updated successfully", data: updatedData });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    console.error("Error updating database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  login,
  HelpCase,
  retrieveHelpsData,
  UpdatingData,
};
