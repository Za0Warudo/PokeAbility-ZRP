import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/pokemon/abilities-description/";

export default function AbilityInfo() {

    const { name } = useParams(); // Get param from URL

    const [ability, setAbility] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!name) return;

        setLoading(true);
        fetch(API_URL + name)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch ability info");
                return res.json();
            })
            .then((data) => {
                setAbility(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [name]);

    return (
        <div className="text-center mt-5">
            <h2 className="mb-4 text-primary text-capitalize">{name}</h2>

            <div className="fs-4 fw-semibold mb-3 text-dark">
                What it's effects?
            </div>

            {loading && <p>Loading ability info...</p>}
                {error && <p className="text-danger">{error}</p>}

            {!loading && !error && ability && (
                <div className="mx-auto p-4 bg-light rounded-4 shadow-sm text-start" style={{ maxWidth: "600px" }}>
                    <h4 className="mb-3 text-secondary">Short Effect</h4>
                    <p>{ability.short_effect}</p>

                    <h4 className="mb-3 text-secondary">Effect</h4>
                    <p className="mb-4">{ability.effect}</p>
                </div>
            )}
        </div>
    );
}
