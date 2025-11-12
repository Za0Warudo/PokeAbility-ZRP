import {Link} from "react-router-dom";

const options = [ // Define the options of navbar
    {link: '/',                 label: 'Home'},
    {link: '/abilities',        label: 'Abilities'},
    {link: '/pokeability',      label: 'Pokémon'},
]

export default function Navbar() {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand fw-bold text-danger" to="/">
                <h4>
                    Poké<span className="text-primary">Abilities</span>
                </h4>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    {options.map((item, index) => (
                        <li key={index}>
                            <Link className="nav-link" to={item.link}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </nav>
    );
}