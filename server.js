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
    res.send('Hello World! Welcome to my server.');
});

// Mount routes
const noteRoutes = require('./routes/noteRoutes');
app.use('/', noteRoutes); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
