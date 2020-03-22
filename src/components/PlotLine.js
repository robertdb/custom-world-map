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

const data = [
  {
    name: "Page A",
    infectados: 4000
  },
  {
    name: "Page B",
    infectados: 3000
  },
  {
    name: "Page C",
    infectados: 2000
  },
  {
    name: "Page D",
    infectados: 2780
  },
  {
    name: "Page E",
    infectados: 1890
  },
  {
    name: "Page F",
    infectados: 2390
  },
  {
    name: "Page G",
    infectados: 3490
  }
];

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
