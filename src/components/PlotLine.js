import React, { PureComponent } from "react";
import withWidth from "@material-ui/core/withWidth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const PlotLine = ({ width, timeLine }) => {
  const size = {
    xs: 360,
    sm: 500,
    md: 600
  };

  const widthLine = size[width] || 600;
  console.log("timeLine", timeLine);

  return (
    <LineChart
      width={widthLine}
      height={300}
      data={timeLine}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="infectados" stroke="#71a7d9" />
    </LineChart>
  );
};

export default withWidth()(PlotLine);
