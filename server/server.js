const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/user', require('./routes/userRouter'));

// Define a default route
app.get('/', (req, res) => {
    res.json({ msg: "This is an example" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI);

// MongoDB connection event handling
const db = mongoose.connection;

db.on('error', (error) => {
    console.error("Error connecting to MongoDB:", error);
});

db.once('open', () => {
    console.log("MongoDB connected");
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});
