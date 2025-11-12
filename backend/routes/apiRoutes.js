// Imports
const express = require('express');
const router = express.Router();

const pokemonRouter = require('./api/pokemon/pokemonRoutes');

// Define a GET route for /api
router.get('/', (req, res) => {
    res.send('API Routes - GET API');
});

// Pokemon API route
router.use('/pokemon', pokemonRouter);


module.exports = router; // Export router object
