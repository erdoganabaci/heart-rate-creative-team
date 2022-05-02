import { useEffect, useState, useCallback } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import HistoryBarChart from "examples/Charts/ReCharts/HistoryBarChart";
import HistoryLineChart from "examples/Charts/ReCharts/HistoryLineChart";

import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import BatteryCard from "examples/Cards/StatisticsCards/BatteryCard";
import HeartCard from "examples/Cards/StatisticsCards/HeartCard";
import CountDownCard from "examples/Cards/StatisticsCards/CountDownCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import HeartMonitor from "./heartMonitor";
import MiBand from "./miband";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const bluetooth = navigator.bluetooth;
  const [state, setState] = useState("");
  const [battery, setBattery] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [hrmStatus, setHrmStatus] = useState("");

  const [maxMinRate, setMaxMinRate] = useState({ min: 90, max: 110 });
  const [minRate, setMinRate] = useState(90);
  const [maxRate, setMaxRate] = useState(110);

  console.log("minRate parent", minRate);
  console.log("maxRate parent", maxRate);

  console.log("max Rate", maxMinRate.max);
  console.log("min rate", maxMinRate.min);

  const handleMaxChange = (max) => {
    setMaxRate(max);
  };

  const handleMinChange = (min) => {
    setMinRate(min);
  };

  const handleMaxMinChange = (min, max) => {
    setMaxMinRate({ min, max });
  };

  const [miband, setmiband] = useState();
  console.log("miband", miband);
  // let miband;
  // function delay(ms) {
  //     return new Promise(resolve => setTimeout(resolve, ms))
  //   }
  async function onHeartRate(rate) {
    console.log("hey I am changing after mi band", maxRate);

    console.log("Heart Rate:", rate);
    setHeartRate(rate);
    // if (rate >= 80) {
    //   console.log("you exceed heart rate limit", rate);
    //   //   await miband.showNotification('vibrate');
    // }

    if (rate > maxRate) {
      console.log("you exceed max heart rate limit", rate);
      console.log("maxRate bound compare", maxRate);
      await miband.showNotification("vibrate");
      setTimeout(async () => {
        await miband.showNotification("vibrate");
      }, 1000);
    } else if (rate < minRate) {
      console.log("minRate bound compare", minRate);

      console.log("Be carefull you exceed min heart rate limit", rate);
      await miband.showNotification("vibrate");
    }
  }

  useEffect(() => {
    startHeartRate();
  }, [maxRate, minRate]);
  const startHeartRate = useCallback(async () => {
    if (!miband) {
      return;
    }
    console.log("hey I am changing", maxRate);
    miband.removeAllListeners("heart_rate");
    console.log(miband.listeners("heart_rate"));
    miband.on("heart_rate", onHeartRate.bind(this));
    await miband.hrmStart().then(async () => {
      console.log("hrmStart");
      setHrmStatus("hrmStart");
    });
  }, [maxRate, minRate, miband]);

  const stopHeartRate = async () => {
    await miband.hrmStop().then(async () => {
      console.log("miHrmStop");
      setHrmStatus("hrmStop");
      await miband.showNotification("vibrate");
      setTimeout(async () => {
        await miband.showNotification("vibrate");
      }, 1000);
    });
  };
  const scan = async () => {
    if (!bluetooth) {
      console.log("WebBluetooth is not supported by your browser!");
      return;
    }

    try {
      console.log("Requesting Bluetooth Device...");
      setState("Requesting Bluetooth Device...");
      const device = await bluetooth.requestDevice({
        filters: [{ services: [MiBand.advertisementService] }],
        optionalServices: MiBand.optionalServices,
      });

      device.addEventListener("gattserverdisconnected", () => {
        console.log("Device disconnected");
        setState("Device disconnected");
      });

      console.log("Connecting to the device...");
      setState("Connecting to the device...");
      const server = await device.gatt.connect();
      console.log("Connected");
      setState("Device Connected");

      const miband = new MiBand(server);
      setmiband(miband);
      await miband.init();

      console.log("getBatteryInfo ", await miband.getBatteryInfo());
      await miband.getBatteryInfo().then((res) => {
        setBattery(res.level);
      });

      // miband.on('heart_rate', async (rate) => {
      //     console.log('Heart Rate:', rate)
      //     setHeartRate(rate);
      //     if(rate >= 80){
      //       console.log("you exceed heart rate limit",rate)
      //     //   await miband.showNotification('vibrate');
      //     }
      //   })
      //   await miband.hrmStart().then(async () => {
      //     console.log("hrmStart");
      //   });

      //   await delay(300000);
      //   await miband.hrmStop().then(async () => {
      //     console.log("miHrmStop");
      //     // await miband.showNotification('vibrate');
      //   });
      // setBattery();

      // await test_all(miband, log);
    } catch (error) {
      console.log("Argh!", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar scan={scan} startHeartRate={startHeartRate} stopHeartRate={stopHeartRate} />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <BatteryCard
                color="dark"
                icon="battery_charging_full"
                title="Battery"
                count={battery}
                percentage={{
                  color: `${state === "Device Connected" ? "success" : "error"}`,
                  amount: `${state === "Device Connected" ? "Connected" : "Disconnected"} `,
                  // label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <HeartCard
                icon="monitor_heart"
                title={`${
                  heartRate > maxRate || heartRate < minRate ? "Heart Rate Exceed" : "Heart Rate"
                }`}
                count={heartRate}
                countColor={`${heartRate > maxRate || heartRate < minRate ? "error" : "success"}`}
                percentage={{
                  color: `${hrmStatus === "hrmStart" ? "success" : "error"}`,
                  amount: `${hrmStatus === "hrmStart" ? "Heart Rate Start" : "Heart Rate Stop"} `,
                  // label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={1.5}>
              <CountDownCard
                color="success"
                icon="hourglass_bottom"
                title="Countdown"
                count="00:59"
                percentage={{
                  color: "success",
                  amount: "",
                  // label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox mt={5} mb={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Projects
                handleMaxMinChange={handleMaxMinChange}
                handleMaxChange={handleMaxChange}
                handleMinChange={handleMinChange}
              />
            </Grid>
            {/* <Grid item xs={12} md={12} lg={12}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>

        <MDBox mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <HistoryBarChart
                  color="info"
                  title="History of last 10 workouts "
                  description="Last 10 Performance"
                  date="last update 2 days ago"
                  // chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <HistoryLineChart
                  color="info"
                  title="Showing fluctuation in heart rate throught the whole workout. "
                  description="Last 10 Performance"
                  date="last update 2 days ago"
                  // chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>

            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Showing fluctuation in heart rate throught the whole workout. "
                  // description="Last Campaign Performance"
                  date="1 day ago updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>

        {/* <MDBox mb={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
               <div>
                heartMonitor
                <div>{state}</div>
                <div>Battery Level: {battery}</div>
                <div>Heart Rate: {heartRate}</div>
                <button onClick={scan}>Scan</button>
                <button onClick={startHeartRate}>Start Heart Rate</button>
                <button onClick={stopHeartRate}>Stop Heart Rate</button>
              </div> 
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
