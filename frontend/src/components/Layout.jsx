import Navbar from "./Navbar";
import "../styles/background.css";

export default function Layout({children }) {
    return (
        <div className="bg-poke">
            <Navbar />
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="container p-5 bg-white rounded-4 shadow text-center">
                    {children}
                </div>
            </div>
        </div>
    );
}
