// Imports
const express = require('express');
const router = express.Router();

const pokeAbilitiesRouter = require('./pokeAbilitiesRoutes');
const abilitiesDescriptionRouter = require('./abilitiesDescriptionRoutes');

// Define poke-abilities routes
router.use('/poke-abilities', pokeAbilitiesRouter);

// Define abilities-description routes
router.use('/abilities-description', abilitiesDescriptionRouter);

module.exports = router;