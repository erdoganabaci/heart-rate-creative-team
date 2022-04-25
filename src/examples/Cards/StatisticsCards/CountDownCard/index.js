/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";

function CountDownCard({ color, title, count, percentage, icon }) {
  const [timeInput, setTimeInput] = useState(59);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    setSeconds(timeInput);
  }, [timeInput]);

  // console.log("seconds", seconds);

  // console.log("timeInput", timeInput);
  const toggle = () => {
    setIsActive(!isActive);
  };

  const resetCountDownTimer = () => {
    setIsActive(true);
    setMinutes(0);
    setSeconds(10);
  };

  const onChangeMinute = () => {
    const minuteInputValue = minuteRef.current.value;
    if (minuteInputValue >= 0) {
      setMinutes(Number(minuteInputValue));
    }
  };

  const onChangeSecond = () => {
    const secondInputValue = secondRef.current.value;
    // we use greater than zero otherwise when user give 0 always show done :(
    if (secondInputValue > 0) {
      setSeconds(Number(secondInputValue));
    }
  };

  const setMinutesSeconds = () => {
    const minuteInputValue = minuteRef.current.value;
    const secondInputValue = secondRef.current.value;
    if (minuteInputValue >= 0 && secondInputValue >= 0) {
      setMinutes(Number(minuteInputValue));
      setSeconds(Number(secondInputValue));
    }
  };

  useEffect(() => {
    let myInterval;
    if (!isActive) {
      myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            // Play After Done
            console.log("Done");
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            // If seconds equal 00 we set 59 count down
            setSeconds(59);
          }
        }
      }, 1000);
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [isActive, minutes, seconds]);

  const handleTimeInput = (e) => {
    setTimeInput(e.target.value);
  };
  // console.log("secondRef", secondRef?.current?.value);
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <MDTypography variant="h4">00:{seconds}</MDTypography>
          <TextField
            ref={secondRef}
            value={timeInput}
            onChange={handleTimeInput}
            color="primary"
            label="Time"
            placeholder="Set Time"
            // InputProps={{
            //   inputComponent: CustomInputComponent,
            // }}
          />
          <MDButton variant="outlined" color="info" onClick={toggle}>
            Start
          </MDButton>
        </MDBox>
      </MDBox>

      <Divider />
      <MDBox pb={2} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex">
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </MDTypography>
          &nbsp;{percentage.label}
        </MDTypography>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
CountDownCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
CountDownCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default CountDownCard;
