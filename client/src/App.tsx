
import './App.css'
// import {Pill} from "@mantine/core";
import ResponsiveAppBar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import About from "./pages/About.tsx";
import Races from "./pages/Races.tsx";
import Cars from "./pages/Cars.tsx";
import Tracks from "./pages/Tracks.tsx";

function App() {


    return (
        <>
            <ResponsiveAppBar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/races" element={<Races />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/tracks" element={<Tracks />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    )
}

export default App
