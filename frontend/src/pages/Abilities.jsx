import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/abilities.css";

const API_URL = "http://localhost:3000/api/pokemon/abilities-description/";

export default function Abilities() {
    const [abilities, setAbilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch abilities");
                return res.json();
            })
            .then((data) => {
                setAbilities(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="text-center mt-5">
            <h2 className="mb-4">
                <span className="text-primary">Abilities</span>
            </h2>

            <div className="fs-4 fw-semibold mb-3 text-dark">
                See what is the effect of any of these abilities
            </div>

            <div className="mx-auto p-4 bg-light rounded-4 shadow-sm">
                {loading && <p>Loading abilities...</p>}
                {error && <p className="text-danger">{error}</p>}

                {!loading && !error && (
                    <div className="row">
                        {abilities.map((ability, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <Link
                                    to={`/abilities/${ability}`}
                                    className="ability-btn w-100 p-3 text-capitalize text-decoration-none d-block"
                                >
                                    {ability}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
