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
  Line,
  BarChart,
  Bar,
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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div style={{ backgroundColor: "black", borderRadius: "5px", padding: "1px 8px" }}>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Lower Bound Exceed Count"} : ${
          payload[0].payload.exceedLowerCount
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Max Bound Exceed Count"} : ${
          payload[0].payload.exceedMaxCount
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Total Exceed Count"} : ${
          payload[0].payload.totalExceed
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Second"} : ${
          payload[0].payload.second
        }`}</p>
      </div>
    );
  }
  return null;
};

const HistoryBarChart = function HistoryBarChart({
  missHeartData,
  mdBoxColor,
  title,
  description,
  date,
}) {
  // const data = [
  //   {
  //     exceedLowerCount: 10,
  //     exceedMaxCount: 8,
  //     totalExceed: 18,
  //     second: 0,
  //   },
  //   {
  //     exceedLowerCount: 6,
  //     exceedMaxCount: 7,
  //     totalExceed: 13,
  //     second: 15,
  //   },
  //   {
  //     exceedLowerCount: 6,
  //     exceedMaxCount: 5,
  //     totalExceed: 11,
  //     second: 30,
  //   },
  //   {
  //     exceedLowerCount: 5,
  //     exceedMaxCount: 5,
  //     totalExceed: 10,
  //     second: 45,
  //   },

  //   {
  //     exceedLowerCount: 0,
  //     exceedMaxCount: 0,
  //     totalExceed: 0,
  //     second: 59,
  //   },
  // ];
  const sortedMissHeartData = missHeartData.sort((a, b) => a.second - b.second);
  const filteredSortedMissHeartData = sortedMissHeartData.filter(
    (a, i) => sortedMissHeartData.findIndex((s) => a.second === s.second) === i
  );
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
            <BarChart
              width="100%"
              height="100%"
              data={filteredSortedMissHeartData}
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="second" />
              <YAxis dataKey="totalExceed" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
              <Legend />
              {/* <Bar dataKey="totalExceed" fill="#8884d8" /> */}
              <Bar dataKey="exceedLowerCount" stackId="a" fill="#8884d8" />
              <Bar dataKey="exceedMaxCount" stackId="a" fill="#82ca9d" />

              {/* <Bar dataKey="exceedMaxCount" fill="#82ca9d" /> */}
              <Line type="monotone" dataKey="totalExceed" stroke="white" />

              <Brush height={15} />
            </BarChart>
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
HistoryBarChart.defaultProps = {
  mdBoxColor: "dark",
  description: "",
};

// Typechecking props for the ReportsBarChart
HistoryBarChart.propTypes = {
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

export default HistoryBarChart;
