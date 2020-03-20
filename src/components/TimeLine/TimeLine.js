import React, { Component } from "react";
import "react-step-progress-bar/styles.css";
import Typography from "@material-ui/core/Typography";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import Box from "@material-ui/core/Box";
import { informes } from "./data";

class TimeLine extends Component {
  render() {
    return (
      <Timeline lineColor={"#ddd"}>
        {informes.map((item, index) => {
          const { date, lines } = item;
          return (
            <TimelineItem
              key={index}
              dateText={date}
              style={{ color: "#71a7d9" }}
              dateInnerStyle={{ background: "#71a7d9", color: "#fff" }}
            >
              <React.Fragment>
                <Typography key={index} variant="h6" gutterBottom>
                  Destacados
                </Typography>
              </React.Fragment>
              {lines.map((item, index) => (
                <Box m={0}>
                  <Typography key={index} variant="body2" gutterBottom>
                    {item}
                  </Typography>
                </Box>
              ))}
            </TimelineItem>
          );
        })}
      </Timeline>
    );
  }
}

export default TimeLine;
