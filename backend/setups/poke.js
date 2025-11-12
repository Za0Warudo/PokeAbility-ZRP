const {getPokeAPIUrl} = require('./util');

const API_URL = getPokeAPIUrl() + 'pokemon/';

/**
 * Clean the given name. removes space at beginning and end of the string, and set all letters to lower case
 * @param name - the name
 * @returns {string}
 */
const cleanName = (name) => name.toLowerCase().trim()

/**
 * Try to get the pokemon data from the pokeapi
 * @param pokeName - pokemon name
 * @returns {Promise<void>}
 */
async function getPokeData(pokeName) {
    const pokeUrl = API_URL + pokeName;

    const res = await fetch(pokeUrl);

    if (res.status === 404) throw new Error(`PokemonNotFound: The name "${pokeName}" is invalid.`);

    if (!res.ok) throw new Error(`HTTP error: ${res.statusText}`);

    return res.json();
}

/**
 * Get pokemon abilities from the pokeapi
 * @param pokeName - pokemon name
 * @param sort - true if the list must be sort
 * @returns {Promise<void>}
 */
async function getPokeAbilitiesName(pokeName, sort = true) {

    pokeName = cleanName(pokeName);

    if (!pokeName) return [];

    try {
        const pokeData = await getPokeData(pokeName);

        if (!pokeData) throw new Error('PokeData structure missing or invalid.');


        const abilities = pokeData?.abilities ?? [];

        const abilitiesName = abilities.map(id => id.ability?.name);

        const filteredAbilitiesName = abilitiesName.filter(Boolean);

        if (sort) filteredAbilitiesName.sort();
        return filteredAbilitiesName;
    } catch (error) {
        if (error.message.startsWith('PokemonNotFound')) return [];
        throw error;
    }
}

module.exports = { getPokeAbilitiesName };