export default function Home() {
    return (
        <div className="text-center mt-5">
            <h2 className="mb-4">
                Welcome to
                <span className="text-danger"> Poké</span>
                <span className="text-primary">Abilities</span>
            </h2>

            <div className="fs-4 fw-semibold mb-3 text-dark">
                What can you find here?
            </div>

            <div className="mx-auto p-4 bg-light rounded-4 shadow-sm">
                <p className="mb-2">
                    Here you can explore Pokémon and their unique abilities!
                </p>
                <p className="mb-2">
                    Search for a Pokémon to see its powers, or look up an ability to learn what it does.
                </p>
            </div>
        </div>
    );
}