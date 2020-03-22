import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TimeLine from "../components/TimeLine";
import Topbar from "./Topbar";
import CountryCard from "../components/Country";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import PlotLine from "../components/PlotLine";
import MathModel from "../components/MathModel";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");

const Main = () => {
  const [argInfo, setInfo] = useState(null);
  const [argInfoTimeline, setArgInfoTimeline] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getArgData = async () => {
      try {
        let responseGlobal = await fetch(
          `https://thevirustracker.com/free-api?countryTotal=AR`
        );
        let globalState = await responseGlobal.json();
        setInfo(globalState.countrydata[0]);
        console.log("GLOBAL STATE", globalState.countrydata[0]);

        let responseTimeline = await fetch(
          `https://thevirustracker.com/free-api?countryTimeline=AR`
        );
        let timeLine = await responseTimeline.json();
        const { timelineitems } = timeLine;
        const time = timelineitems[0];

        const timePlot = Object.keys(time)
          .map(date => {
            const { total_cases } = time[date];
            return {
              name: moment(date).format("MMMM Do"),
              infectados: total_cases
            };
          })
          .filter(i => i.infectados > 0);

        timePlot.push({
          name: "hoy",
          infectados: globalState.countrydata[0].total_cases
        });

        setArgInfoTimeline(timePlot);
        console.log("TIMELINE", timePlot);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getArgData();
  }, []);

  const ColorCircularProgress = withStyles({
    root: {
      color: "#71a7d9"
    }
  })(CircularProgress);

  if (isLoading) {
    return (
      <div>
        <Topbar />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={"0px 16px"}
        >
          <ColorCircularProgress />
        </Box>
      </div>
    );
  }

  const {
    total_cases,
    total_deaths,
    total_new_cases_today,
    total_new_deaths_today
  } = argInfo;

  return (
    <div>
      <Topbar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        m={"5rem 1rem 0rem 1rem"}
      >
        <Typography variant="h5">Coronavirus en Argentina</Typography>
      </Box>
      <Paper elevation={3} style={{ margin: "0px 8px" }}>
        <Box m={"32px 0px"} p={"16px 0px"}>
          <Grid container xs={12} spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={"0px 16px"}
              >
                <Typography variant="h5" gutterBottom>
                  Infectados
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={"0px 16px"}
                variant="h5"
              >
                {total_cases}
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={"0px 16px"}
              >
                <Typography variant="h5" gutterBottom>
                  Muertos
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={"0px 16px"}
                variant="h5"
              >
                {total_deaths}
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={"0px 16px"}
                variant="h5"
              >
                <Typography variant="h5" gutterBottom>
                  Casos hoy
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={"0px 16px"}
                variant="h5"
              >
                {total_new_cases_today}
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={"0px 16px"}
              >
                <Typography variant="h5" gutterBottom>
                  Muertos hoy
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={"0px 16px"}
                variant="h5"
              >
                {total_new_deaths_today}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        m={"5rem 1rem 0rem 1rem"}
      >
        <Typography variant="h5">Infectados en Argentina</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        m={"16px 0px"}
      >
        <PlotLine timeLine={argInfoTimeline} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        m={"5rem 1rem 0rem 1rem"}
      >
        <Typography variant="h5">#QuedateEnCasa</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        m={"2rem 1rem 0rem 1rem"}
      >
        <MathModel timeline={argInfoTimeline} />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        m={"5rem 1rem 0rem 1rem"}
      >
        <Typography variant="h5">Informe Oficial del Gobierno</Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <TimeLine />
      </Box>
    </div>
  );
};

export default Main;
