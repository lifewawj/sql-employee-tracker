// Import express
const express = require("express");

const PORT = process.env.PORT || 3001; // Create a const var called 'PORT' and stores a place for the server to run on
const app = express(); // Create the express app by storing within an const var called 'app'

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Inits the app
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});