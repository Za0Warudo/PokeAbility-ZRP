// Imports
const express = require('express');
const router = express.Router();

const {getPokeAbilitiesName} = require("../../../setups/api");

router.get('/', (req, res) => {
    res.send(`Pokemon abilities API, try to specified the pokemon name in the URL`);
})

router.get('/:pokeName', (req, res) => {
    const { pokeName } = req.params;
    getPokeAbilitiesName(pokeName).then( abilities => {
        if (abilities.length === 0) {
            return res.status(404).json([]);
        }
        res.status(200).json(abilities);
    })
    .catch(error => {
        console.error("Error fetching Pokémon abilities:", error);
        res.status(500).json({
            message: 'Failed to retrieve abilities due to a server error'
        });
    })
})


module.exports = router;