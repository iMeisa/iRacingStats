import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import SeriesLogo from "../../components/images/SeriesLogo.tsx";
import useIsMobile from "../../hooks/useIsMobile.ts";
import {DriverRace} from "../../models/driver/Race.ts";

type SeriesTrophies = {
    id: number,
    series: string,
    logo: string,
    golds: number,
    silvers: number,
    bronzes: number,
}

function FilterPodiums(results: DriverRace[]): [SeriesTrophies[], SeriesTrophies] {
    let trophies: SeriesTrophies[] = []
    let totals: SeriesTrophies = { id: 0, series: '', logo: '', golds: 0, silvers: 0, bronzes: 0 }

    let podiums: Record<number, SeriesTrophies> = {}

    results.map((result: DriverRace) => {

        if (!result.valid_race) return

        const series_id = result['series_id'] as number
        const position = result['finish_position_in_class'] as number

        if (position > 2) return

        if (!(series_id in podiums)) {
            podiums[series_id] = {
                id: series_id,
                series: result['series_short_name'] as string,
                logo: result['series_logo'] as string,
                golds: 0,
                silvers: 0,
                bronzes: 0,
            }
        }

        switch (position) {
            case 0:
                podiums[series_id].golds++
                totals.golds++
                break
            case 1:
                podiums[series_id].silvers++
                totals.silvers++
                break
            case 2:
                podiums[series_id].bronzes++
                totals.bronzes++
                break
        }
    })

    // console.log("podiums: ", podiums)

    for (const series_id in podiums) {
        trophies.push(podiums[series_id])
    }

    // console.log("trophies: ", trophies)

    return [SortTrophies(trophies), totals]
}

function SortTrophies(trophies: SeriesTrophies[]): SeriesTrophies[] {
    trophies.sort((a,b) => (a.bronzes < b.bronzes) ? 1 : ((b.bronzes < a.bronzes) ? -1 : 0));
    trophies.sort((a,b) => (a.silvers < b.silvers) ? 1 : ((b.silvers < a.silvers) ? -1 : 0));
    trophies.sort((a,b) => (a.golds < b.golds) ? 1 : ((b.golds < a.golds) ? -1 : 0));
    return trophies
}

export default function TrophyCabinet(props: {loading: boolean, driverRaces: DriverRace[]}) {

    // console.log('trophy cabinet')

    const [trophies, totals] = FilterPodiums(props.driverRaces)

    const isMobile = useIsMobile()

    return <TableContainer sx={{ maxHeight: '65vh' }} component={Paper}>
        <Table stickyHeader aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>
                        <strong>Series</strong> <br/>
                        Total
                    </TableCell>
                    { isMobile ? <></> : <TableCell></TableCell>}
                    <TableCell align="right">
                        <strong>Gold</strong> <br/>
                        {totals.golds}
                    </TableCell>
                    <TableCell align="right">
                        <strong>Silver</strong> <br/>
                        {totals.silvers}
                    </TableCell>
                    <TableCell align="right">
                        <strong>Bronze</strong> <br/>
                        {totals.bronzes}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                { props.loading ? (
                        <TableCell colSpan={isMobile ? 4 : 5} align="center">
                            <CircularProgress/>
                        </TableCell>
                ) : (
                    <CabinetRows trophies={trophies} mobile={isMobile}/>
                )}
            </TableBody>
        </Table>
    </TableContainer>
}

function CabinetRows(props: {trophies: SeriesTrophies[], mobile: boolean}) {
    return <>
        { props.trophies.length > 0 ? props.trophies.map((row) => (
            <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>
                    <Link to={`/series/${row.id}`}>
                        <SeriesLogo link={row.logo} />
                    </Link>
                </TableCell>
                { props.mobile? <></> :
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        {row.series}
                    </TableCell>
                }
                <TableCell align="right">{row.golds}</TableCell>
                <TableCell align="right">{row.silvers}</TableCell>
                <TableCell align="right">{row.bronzes}</TableCell>
            </TableRow>
        )) :
            <TableCell colSpan={ props.mobile ? 4 : 5 } align="center">No Trophies Yet</TableCell>
        }
    </>
}
