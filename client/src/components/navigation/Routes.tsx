
import Home from "../../pages/Home.tsx";
import {Route, Routes as RouterRoutes} from "react-router-dom";
import Races from "../../pages/races/Races.tsx";
import Session from "../../pages/races/Session.tsx";
import Subsession from "../../pages/races/subsession/Subsession.tsx";
import SingleSeries from "../../pages/series/singleSeries/SingleSeries.tsx"
import SeriesList from "../../pages/series/seriesList/SeriesList.tsx"
import Cars from "../../pages/cars/Cars.tsx";
import Tracks from "../../pages/tracks/Tracks.tsx";
import Drivers from "../../pages/drivers/Drivers.tsx";
import Driver from "../../pages/drivers/Driver.tsx";
import AnalyticsPage from "../../pages/Analytics.tsx";
import Track from "../../pages/tracks/Track.tsx";
import MissingPage from "../../pages/MissingPage.tsx";

export default function Routes() {

    // PageTitle()

    return (
        <RouterRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/races" element={<Races />} />
            <Route path="/series" element={<SeriesList />} />
            <Route path="/series/:id" element={<SingleSeries />} />
            <Route path="/sessions/:id" element={<Session />} />
            <Route path="/subsession/:id" element={<Subsession />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/track/:id" element={<Track/>} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/driver/:id" element={<Driver />} />
            <Route path="*" element={<MissingPage/>} />
            {/*<Route path="/about" element={<About />} />*/}
        </RouterRoutes>
    )
}
