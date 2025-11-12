// Imports
const express = require('express');
const cors = require('cors');

// Routes
const apiRoutes = require('./routes/apiRoutes');

// Create app
const app = express();

app.use(cors());

// -- ROUTES -- //

// Define root router
app.get('/', (req, res) => {
    res.send('This is project backend!');
})

// Define all API routes
app.use('/api', apiRoutes);

module.exports = app;