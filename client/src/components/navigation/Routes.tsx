
import Home from "../../pages/Home.tsx";
import {Route, Routes as RouterRoutes} from "react-router-dom";
import Races from "../../pages/races/Races.tsx";
import Sessions from "../../pages/races/Sessions.tsx";
import Subsession from "../../pages/races/Subsession.tsx";
import Series from "../../pages/series/Series.tsx"
import SeriesList from "../../pages/series/SeriesList.tsx"
import Cars from "../../pages/cars/Cars.tsx";
import Tracks from "../../pages/Tracks.tsx";
import Users from "../../pages/users/Users.tsx";
import User from "../../pages/users/User.tsx";

export default function Routes() {
    return (
        <RouterRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/races" element={<Races />} />
            <Route path="/series" element={<SeriesList />} />
            <Route path="/series/:id" element={<Series />} />
            <Route path="/sessions/:id" element={<Sessions />} />
            <Route path="/subsession/:id" element={<Subsession />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<User />} />
            {/*<Route path="/about" element={<About />} />*/}
        </RouterRoutes>
    )
}
