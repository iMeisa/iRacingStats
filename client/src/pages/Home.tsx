import Typography from "@mui/material/Typography";
import '../style/Odometer.css'
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import PageCard from "../components/navigation/PageCard.tsx";
import {Card, CardActions, CardHeader, Divider} from "@mui/material";
import {Link} from "react-router-dom";
import DiscordIcon from "../assets/discord.svg";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Home() {

    return (
        <>
            <Typography variant="h3" fontWeight={600} mt={3}>iRStats (Beta)</Typography>
            <Typography variant="subtitle1" mb={3}>Home of iRacing statistics</Typography>

            <Container>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={6}>
                        <PageCard
                            title="Races"
                            description="See races that just finished"
                            link="/races"
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={6}>
                        <PageCard
                            title="Series"
                            description="See series participation and more"
                            link="/series"
                            wip
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <PageCard
                            title="Cars"
                            description="Find stats for your favorite cars"
                            link="/cars"
                            wip
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <PageCard
                            title="Tracks"
                            description="Your favorite tracks also have stats"
                            link="/tracks"
                            wip
                        />
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <PageCard
                            title="Users"
                            description="Statistics about you and your friends"
                            link="/users"
                        />
                    </Grid>
                </Grid>

                <Divider  sx={{ my: '2em', mx: '15px' }}/>

                <Grid container>
                    <Grid xs={0} sm={4}/>
                    <Grid xs={12} sm={4}>
                        <Card>
                            <CardHeader title="Be a part of the project"/>
                            <img
                                alt="discord server"
                                src={DiscordIcon}
                            />
                            <CardActions sx={{ display: 'flex', justifyContent: 'center' }} >
                                <Link to={"https://discord.gg/N7zVpSa2uJ"} target="_blank">
                                    <Button variant="contained">Join</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid xs={0} sm={4}/>
                </Grid>

            </Container>
            <Box my={5}/>
        </>
    )
}
