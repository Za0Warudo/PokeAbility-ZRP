import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import { AnimatePresence} from "framer-motion";
import PageWrapper from "./components/PageWrapper.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home";
import Abilities from "./pages/Abilities.jsx";
import Pokemon from "./pages/Pokemon.jsx";
import AbilityInfo from "./pages/AbilityInfo.jsx";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/abilities" element={<PageWrapper><Abilities /></PageWrapper>} />
                <Route path="/abilities/:name" element={ <PageWrapper> <AbilityInfo/> </PageWrapper>} />
                <Route path="/pokeability" element={<PageWrapper><Pokemon /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <AnimatedRoutes/>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
