
import Home from "../pages/Home.tsx";
import {Route, Routes as RouterRoutes} from "react-router-dom";
import About from "../pages/About.tsx";
import Races from "../pages/Races.tsx";
import Cars from "../pages/Cars.tsx";
import Tracks from "../pages/Tracks.tsx";

export default function Routes() {
    return (
        <RouterRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/races" element={<Races />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/about" element={<About />} />
        </RouterRoutes>
    )
}