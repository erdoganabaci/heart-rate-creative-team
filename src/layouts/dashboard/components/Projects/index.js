import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// import { makeStyles } from " @mui/material/styles";

function Projects({
  handleMaxMinChange,
  handleMaxChange,
  handleMinChange,
  handleWorkoutNameChange,
}) {
  // const useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
  // }));

  // const { formControl } = useStyles();
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [heartRate, setHeartRate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");

  const handleChange = (event) => {
    console.log("event.target.value", event.target.value);
    const startHeartTime = event.target.value.split("-")[0];
    const stopHeartTime = event.target.value.split("-")[1];
    const workoutName = event.target.value.split("-")[2];

    setStartTime(startHeartTime);
    setStopTime(stopHeartTime);
    handleMaxMinChange(startHeartTime, stopHeartTime);

    console.log("startHeartTime", startHeartTime);
    console.log("stopHeartTime", stopHeartTime);
    handleMinChange(startHeartTime);
    handleMaxChange(stopHeartTime);
    handleWorkoutNameChange(workoutName);
    setHeartRate(event.target.value);
  };

  // useEffect(() => {
  //   handleMaxMinChange(startTime, stopTime);
  // }, [startTime, stopTime]);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Workouts
          </MDTypography>
          {/* <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 done</strong> this month
            </MDTypography>
          </MDBox> */}
        </MDBox>
        {/* <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox> */}
        {/* {renderMenu} */}
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={4} md={4} lg={4}>
            <Box sx={{ minWidth: 120 }} mb={2}>
              <FormControl size={"medium"}>
                <InputLabel id="demo-simple-select-label">Workout Types</InputLabel>
                <Select
                  sx={{ width: "150px", height: "50px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={heartRate}
                  label="Workout Types"
                  onChange={handleChange}
                  // className={formControl}
                >
                  <MenuItem value={"70-100-Walking"}>Walking</MenuItem>
                  <MenuItem value={"80-90-Squat"}>Squat</MenuItem>
                  <MenuItem value={"90-100-PushUp"}>Push Up</MenuItem>
                  {/* <MenuItem value={30}>30</MenuItem> */}
                </Select>
              </FormControl>
            </Box>{" "}
            <TextField
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                handleMinChange(e.target.value);
                handleMaxMinChange(e.target.value, stopTime);
              }}
              color="primary"
              label="Min Heart"
              placeholder="Min Heart Bound"
              // InputProps={{
              //   inputComponent: CustomInputComponent,
              // }}
            />
            <TextField
              value={stopTime}
              onChange={(e) => {
                setStopTime(e.target.value);
                handleMaxChange(e.target.value);
                handleMaxMinChange(startTime, e.target.value);
              }}
              color="primary"
              label="Max Heart"
              placeholder="Max Heart Bound"
              // InputProps={{
              //   inputComponent: CustomInputComponent,
              // }}
            />
          </Grid>
        </Grid>

        {/* <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        /> */}
      </MDBox>
    </Card>
  );
}

export default Projects;
