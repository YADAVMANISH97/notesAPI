const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const connectDb = require('./config/db');
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Notes API');
});

// Mount routes
const noteRoutes = require('./routes/noteRoutes');
app.use('/', noteRoutes); 

// Listen for requests
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
