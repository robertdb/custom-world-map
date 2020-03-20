import React from "react";
import Topbar from "./Topbar";
import TimeLine from "../components/TimeLine";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Main = () => {
  return (
    <div>
      <Topbar />
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
