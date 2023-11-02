
import Home from "../../pages/Home.tsx";
import {Route, Routes as RouterRoutes} from "react-router-dom";
// import About from "../pages/About.tsx";
import Races from "../../pages/races/Races.tsx";
import Sessions from "../../pages/races/Sessions.tsx";
import Series from "../../pages/series/Series.tsx"
import SeriesList from "../../pages/series/SeriesList.tsx"
import Cars from "../../pages/Cars.tsx";
import Tracks from "../../pages/Tracks.tsx";
import Users from "../../pages/users/Users.tsx";

export default function Routes() {
    return (
        <RouterRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/races" element={<Races />} />
            <Route path="/sessions/:id" element={<Sessions />} />
            <Route path="/series" element={<SeriesList />} />
            <Route path="/series/:id" element={<Series />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/users" element={<Users />} />
            {/*<Route path="/about" element={<About />} />*/}
        </RouterRoutes>
    )
}
