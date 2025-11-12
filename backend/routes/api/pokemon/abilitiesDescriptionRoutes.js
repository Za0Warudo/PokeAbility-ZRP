// Imports
const express = require('express');
const {getAbilityDescription, getAllAbilities} = require("../../../setups/api");
const router = express.Router();

router.get('/', (req, res) => {
    getAllAbilities().then(abilitiesDescriptionList => {
        res.status(200).json(abilitiesDescriptionList);
    })
        .catch((error) => {
            console.error("Error fetching abilities description:", error);
            res.status(500).json({
                message: 'Failed to retrieve ability description due to a server error',
            })
        })
})

router.get('/:abilityName', (req, res) => {
    const { abilityName } = req.params;
    getAbilityDescription(abilityName)
        .then(description => {
            if (description.effect === 'Not Found') {
                return res.status(404).json(description);
            }
            res.status(200).json(description);
        })
        .catch(error => {
            console.error("Error fetching ability description:", error);
            res.status(500).json({
                message: 'Failed to retrieve ability description due to a server error'
            });
        });
})


module.exports = router;