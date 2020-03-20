import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import TimeLine from "../components/TimeLine";
import Topbar from "./Topbar";
import CountryCard from "../components/Country";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const Main = () => {
  const [argInfo, setInfo] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getArgData = async () => {
      try {
        let response = await fetch(
          `https://thevirustracker.com/free-api?countryTotal=AR`
        );
        let responseJson = await response.json();
        setInfo(responseJson.countrydata[0]);
        console.log(responseJson);
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
      <Box m={"32px 0px"}>
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
            >
              {total_new_deaths_today}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={"0px 16px"}
      >
        <Typography variant="h4" gutterBottom>
          Informe Oficial del Gobierno
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <TimeLine />
      </Box>
    </div>
  );
};

export default Main;
