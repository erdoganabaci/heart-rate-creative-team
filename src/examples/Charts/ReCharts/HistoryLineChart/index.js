import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// rechart
import {
  // BarChart,
  LineChart,
  Line,
  // Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// d3 react parse csv example
// https://www.pluralsight.com/guides/load-remote-chart-data-for-d3.js-in-a-react-app
// import * as d3 from "d3";
// https://stackoverflow.com/questions/51258615/reactjs-d3-parse-local-csv-file-and-passing-it-to-state-with-d3-request
// import numbro from "numbro";
// import { HuePicker } from "react-color";

// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload) {
//     return (
//       <div style={{ backgroundColor: "black", borderRadius: "5px", padding: "1px 8px" }}>
//         <p style={{ fontSize: "9pt", color: "white" }}>{`${"Year"} : ${
//           payload[0].payload.Year
//         }`}</p>
//         <p
//           style={{ fontSize: "9pt", color: "white" }}
//         >{`${"BoxOfficeProfits"} : ${payload[0].payload.BoxOfficeProfits.toLocaleString()}$`}</p>
//       </div>
//     );
//   }
//   return null;
// };

const HistoryLineChart = function HistoryLineChart({ mdBoxColor, title, description, date }) {
  const data = [
    {
      name: "Page A",
      workout1: 1,
      workout2: 3,
      heartRate: 70,
      missTime: 30,
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      workout1: 2,
      workout2: 4,
      heartRate: 80,
      missTime: 40,
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      workout1: 3,
      workout2: 5,
      heartRate: 85,
      missTime: 35,
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      workout1: 4,
      workout2: 6,
      heartRate: 90,
      missTime: 36,
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      workout1: 5,
      workout2: 7,
      heartRate: 95,
      missTime: 45,
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      workout1: 6,
      workout2: 8,
      heartRate: 100,
      missTime: 46,
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      workout1: 8,
      workout2: 9,
      heartRate: 110,
      missTime: 58,
      uv: 3490,
      pv: 4300,
    },
  ];

  return (
    <Card sx={{ height: "100%", width: "100%" }}>
      <MDBox padding="1rem">
        <MDBox
          variant="gradient"
          bgColor={mdBoxColor}
          borderRadius="lg"
          coloredShadow={mdBoxColor}
          py={2}
          pr={0.5}
          mt={-5}
          height="16rem"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width="100%"
              height="100%"
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="heartRate" />
              <YAxis dataKey="missTime" />
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Tooltip />
              <Legend />
              <Line dataKey="workout1" fill="#8884d8" />
              <Line dataKey="workout2" fill="#82ca9d" />
              <Brush height={15} />
            </LineChart>
          </ResponsiveContainer>
        </MDBox>

        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light" mb={1}>
            {description}
          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              {date}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
};

// Setting default values for the props of ReportsBarChart
HistoryLineChart.defaultProps = {
  mdBoxColor: "dark",
  description: "",
};

// Typechecking props for the ReportsBarChart
HistoryLineChart.propTypes = {
  mdBoxColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
};

export default HistoryLineChart;
