const {getPokeAPIUrl} = require('./util');

const API_URL = getPokeAPIUrl() + 'ability/';

/**
 * Get all abilities of pokeAPI
 * @returns {Promise<any>}
 */
async function getAllAbilities(sort = true, lang = 'en') {
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error(`HTTP Error: ${res.statusText}`);

    const abilitiesData = await res.json();

    const abilitiesList = abilitiesData.results.map(ability => ability.name.toLowerCase());

    if (sort) abilitiesList.sort(); // Sort

    const validAbilities = abilitiesList.filter(Boolean); // Remove empty name

    return validAbilities;
}

/**
 * Get the effect and short_effect description of the given ability name
 * @param abilityName - the ability name
 * @param lang - the description language
 * @returns {Promise<{effect: string, short_effect: string}|{effect: string|AnimationEffect|*, short_effect: string|*}>}
 */
async function getAbilityDescription(abilityName, lang = 'en') {

    if (!abilityName) return [];

    const res = await fetch(API_URL + abilityName );

    if (res.status === 404) {
        return { effect: 'Not Found', short_effect: 'Not Found' };
    }

    if (!res.ok) throw new Error(`HTTP Error: ${res.statusText}`);

    const abilityData = await res.json();

    const abilityEffEntries= abilityData?.effect_entries ?? [];

    const filteredEffEntries = abilityEffEntries.filter(Boolean);

    const ability = filteredEffEntries.find((abilityEff) => abilityEff?.language?.name === lang);

    if (ability) { // Found
        return {
            effect: ability.effect,
            short_effect: ability.short_effect
        }
    }

    return { // Not found the ability description
        effect: 'Not Found',
        short_effect: 'Not Found'
    };
}

module.exports = {getAllAbilities, getAbilityDescription};