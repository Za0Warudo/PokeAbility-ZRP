import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/pokemon.css';

const API_URL = "http://localhost:3000/api/pokemon/poke-abilities/";

export default function Pokemon() {
    const [pokemon, setPokemon] = useState("");
    const [abilities, setAbilities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!pokemon.trim()) return;

        setLoading(true);
        setError(null);
        setAbilities([]);

        try {
            const res = await fetch(`${API_URL}${pokemon.toLowerCase()}`);
            if (!res.ok) throw new Error("Pokémon not found!");
            const data = await res.json();
            setAbilities(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center mt-5">
            <h2 className="mb-4 fw-bold">
                <span className="text-danger">Pokémon</span>{" "}
            </h2>

            <form
                onSubmit={handleSearch}
                className="d-flex justify-content-center mb-4 search-form"
            >
                <input
                    type="text"
                    value={pokemon}
                    onChange={(e) => setPokemon(e.target.value)}
                    placeholder="Enter Pokémon name..."
                    className="form-control w-100 text-center"
                />
                <button className="btn btn-primary ms-3 px-4" type="submit">
                    Search
                </button>
            </form>

            {loading && <p>Loading abilities...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && abilities.length > 0 && (
                <>
                    <div className="fs-4 fw-semibold mb-4 text-dark">
                        The Pokémon Abilities
                    </div>

                    <div className="abilities-list mx-auto mt-3">
                        {abilities.map((ability, index) => (
                            <Link
                                key={index}
                                to={`/abilities/${ability}`}
                                className="ability-card text-decoration-none"
                            >
                                <div className="ability-index">
                                    Ability {index + 1}:
                                </div>
                                <div className="ability-name text-capitalize">
                                    {ability}
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
