// Imports
const request = require('supertest');
const app = require('../server');

jest.mock('../setups/api'); // Mock API

const { getPokeAbilitiesName, getAbilityDescription } = require('../setups/api');

describe('API Endpoints Tests', () => {


    // -- Pre-Set -- //
    beforeAll(() => {
        getPokeAbilitiesName.mockImplementation(async (pokeName) => {
            const normalizedName = pokeName.toLowerCase();

            switch (normalizedName) {
                case 'pikachu':
                    // Pikachu abilities
                    return ["lightning-rod", "static"];

                case 'magikarp':
                    // Magikarp abilities
                    return ["swift-swim", "rattled"];

                case 'charmander':
                    // Charmander abilities
                    return ["blaze", "solar-power"];

                case 'unknown':
                    // Pokemon not found (API returns 404, service handles it by returning [])
                    return [];

                case 'error-case':
                    // Force an internal service error (simulates a 500)
                    throw new Error('Service failed to connect to PokeAPI.');

                default:
                    // Default behavior (safe fallback)
                    return [];
            }
        });

        getAbilityDescription.mockImplementation(async (abilityName) => {
            const normalizedName = abilityName.toLowerCase();
            switch (normalizedName) {
                case 'blaze' :
                    return {
                        effect: `When this Pokémon has 1/3 or less of its HP remaining, its fire-type moves inflict 1.5× as much regular damage.`,
                        short_effect: "Strengthens fire moves to inflict 1.5× damage at 1/3 max HP or less."
                    };

                case 'stench':
                    return {
                        effect:
                            `This Pokémon's damaging moves have a 10% chance to make the target flinch with each 
                             hit if they do not already cause flinching as a secondary effect.\n\nThis ability
                             does not stack with a held item.\n\nOverworld: The wild encounter rate is halved while this
                             Pokémon is first in the party.`,
                        short_effect: "Has a 10% chance of making target Pokémon flinch with each hit."
                    };
                default:
                    return { effect: 'Not Found', short_effect: 'Not Found' };
            }

        });
    });

    // Test the simple GET / route
    it('GET / should return "This is project backend!"', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('This is project backend!');
    });

    // Test the GET /api/pokemon/poke-ability/:pokeName route
    describe('GET /api/pokemon/poke-abilities/:pokeName', () => {

        it('should return the abilities array for Pikachu', async () => {
            const response = await request(app).get('/api/pokemon/poke-abilities/pikachu'); // Call mock
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(["lightning-rod", "static"]);
            expect(getPokeAbilitiesName).toHaveBeenCalledWith('pikachu');
        });

        it('should return the abilities array for magikarp', async () => {
            const response = await request(app).get('/api/pokemon/poke-abilities/magikarp');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(["swift-swim", "rattled"]);
            expect(getPokeAbilitiesName).toHaveBeenCalledWith('magikarp');
        });


        it('should return the abilities array for charmander', async () => {
            const response = await request(app).get('/api/pokemon/poke-abilities/charmander');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(["blaze", "solar-power"]);
            expect(getPokeAbilitiesName).toHaveBeenCalledWith('charmander');
        });

        it('should return the empty array for unknown', async () => {
            const response = await request(app).get('/api/pokemon/poke-abilities/unknown');
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual([]);
            expect(getPokeAbilitiesName).toHaveBeenCalledWith('unknown');
        });

        it('should return the empty array as default', async () => {
            const response = await request(app).get('/api/pokemon/poke-abilities/any-other')
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual([]);
            expect(getPokeAbilitiesName).toHaveBeenCalledWith('any-other');
        })

        it('should handle errors gracefully if the service throws', async () => {
            getPokeAbilitiesName.mockRejectedValueOnce(new Error('API Down')); // Change mock to test API Down

            const response = await request(app).get('/api/pokemon/poke-abilities/error-test');

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to retrieve abilities due to a server error' });

        });
    });

    describe('GET /api/pokemon/abilities-description/:abilityName', () => {

        it('should return the abilities description for blaze', async () => {
           const response = await request(app).get('/api/pokemon/abilities-description/blaze');
           expect(response.statusCode).toBe(200);

           expect(getAbilityDescription).toHaveBeenCalledWith('blaze');

           expect(response.body).toHaveProperty('effect');
           expect(response.body).toHaveProperty('short_effect');

           expect(response.body).toEqual({
               effect: `When this Pokémon has 1/3 or less of its HP remaining, its fire-type moves inflict 1.5× as much regular damage.`,
               short_effect: "Strengthens fire moves to inflict 1.5× damage at 1/3 max HP or less."

           });

       });

        it('should return the abilities description for stench', async () => {
            const response = await request(app).get('/api/pokemon/abilities-description/stench');
            expect(response.statusCode).toBe(200);

            expect(getAbilityDescription).toHaveBeenCalledWith('stench');

            expect(response.body).toHaveProperty('effect');
            expect(response.body).toHaveProperty('short_effect');

            expect(response.body).toEqual({
                effect:
                    `This Pokémon's damaging moves have a 10% chance to make the target flinch with each 
                             hit if they do not already cause flinching as a secondary effect.\n\nThis ability
                             does not stack with a held item.\n\nOverworld: The wild encounter rate is halved while this
                             Pokémon is first in the party.`,
                short_effect: "Has a 10% chance of making target Pokémon flinch with each hit."
            });
        });

        it('should return "Not Found" for an unknown ability (404 Not Found)', async () => {
            const response = await request(app).get('/api/pokemon/abilities-description/unknown-ability');

            expect(response.statusCode).toBe(404);

            expect(getAbilityDescription).toHaveBeenCalledWith('unknown-ability');

            expect(response.body).toHaveProperty('effect');
            expect(response.body).toHaveProperty('short_effect');

            expect(response.body).toEqual({
                effect: 'Not Found',
                short_effect: 'Not Found'
            });
        });
    });
});