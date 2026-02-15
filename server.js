const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const connectDb = require('./config/db');
connectDb();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello World! This is the Note Taking App API.');
});

// Mount routes
const noteRoutes = require('./routes/noteRoutes');
app.use('/', noteRoutes); 

// Listen for requests
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
