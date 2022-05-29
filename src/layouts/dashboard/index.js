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

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import HeartMonitor from "./heartMonitor";
import MiBand from "./miband";

import useSound from "use-sound";
import speedUp from "sounds/time_to_speedup.mp3";
import finishedExercises from "sounds/finished_exercises.mp3";
import keepGoing from "sounds/keep_going.mp3";
import maxLimitExceed from "sounds/max_limit_exceed.mp3";
import minLimitExceed from "sounds/max_limit_exceed.mp3";
import startExercises from "sounds/start_exercises.mp3";
import slowDown from "sounds/time_to_slow_down.mp3";

function Dashboard() {
  const bluetooth = navigator.bluetooth;
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState("Disconnected");
  const [battery, setBattery] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [hrmStatus, setHrmStatus] = useState("");

  const [maxMinRate, setMaxMinRate] = useState({ min: 90, max: 110 });
  const [workoutName, setWorkoutName] = useState("");
  const [minRate, setMinRate] = useState(90);
  const [maxRate, setMaxRate] = useState(110);
  const [miband, setmiband] = useState();

  const [playSpeedUp] = useSound(speedUp, { interrupt: true });
  const [playFinishedExercises] = useSound(finishedExercises, { interrupt: true });
  const [playKeepGoing] = useSound(keepGoing, { interrupt: true });
  const [playMaxLimitExceed] = useSound(maxLimitExceed, { interrupt: true });
  const [playMinLimitExceed] = useSound(minLimitExceed, { interrupt: true });
  const [playSlowDown] = useSound(slowDown, { interrupt: true });
  const [playStartExercises] = useSound(startExercises, { interrupt: true });

  const [minRateExceedCount, setMinRateExceedCount] = useState(0);
  const [maxRateExceedCount, setMaxRateExceedCount] = useState(0);

  console.log("here timer start", timer);
  console.log("minRate parent", minRate);
  console.log("maxRate parent", maxRate);

  console.log("max Rate", maxMinRate.max);
  console.log("min rate", maxMinRate.min);

  console.log("workoutName", workoutName);

  const [stateHearRateWithTimer, setStateHeartRateWithTimer] = useState([
    {
      heartRate: 0,
      second: 58,
    },
  ]);

  const [numberOfExceedHeartRateData, setNumberOfExceedHeartRate] = useState([
    {
      exceedLowerCount: 0,
      exceedMaxCount: 0,
      totalExceed: 0,
      second: 58,
    },
  ]);

  console.log("stateHearRateWithTimer", stateHearRateWithTimer);
  console.log("numberOfExceedHeartRate", numberOfExceedHeartRateData);

  useEffect(() => {
    console.log("workoutName", workoutName);
    console.log("case timer", timer);
    if (workoutName === "PushUp") {
      console.log("entered push up", timer);

      switch (timer) {
        case 58:
          playStartExercises();
          break;
        case 40:
          playSpeedUp();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);

          break;
        case 20:
          playKeepGoing();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);

          break;
        case 10:
          playSlowDown();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);
          break;
        case 0:
          playFinishedExercises();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);
          break;
      }
      // put here switch case
    } else if (workoutName === "Squat") {
      switch (timer) {
        case 58:
          playStartExercises();
          break;
        case 45:
          playSpeedUp();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);

          break;
        case 35:
          playKeepGoing();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);

          break;
        case 25:
          playSlowDown();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);
          break;
        case 15:
          playSlowDown();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);
          break;
        case 0:
          playFinishedExercises();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);
          break;
      }
    } else {
      switch (timer) {
        case 58:
          playStartExercises();
          // setStateHeartRateWithTimer((prev) => [
          //   ...prev,
          //   { heartRate: Number(heartRate), second: timer },
          // ]);

          // setState([{ heartRate: 80, time: 45 }]);

          break;
        case 45:
          playSpeedUp();
          console.log("last 45 second speed up");
          console.log("heartRate", heartRate);
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);
          // setState([{ heartRate: 80, time: 45 }]);

          break;
        case 30:
          playKeepGoing();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);
          // setState([{ heartRate: 80, time: 30 }]);

          break;
        case 15:
          playSlowDown();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);
          // setState([{ heartRate: 89, time: 15 }]);
          break;
        case 0:
          console.log("Time's up!");
          playFinishedExercises();
          setStateHeartRateWithTimer((prev) => [
            ...prev,
            { heartRate: Number(heartRate), second: timer },
          ]);
          setNumberOfExceedHeartRate((prev) => [
            ...prev,
            {
              exceedLowerCount: minRateExceedCount,
              exceedMaxCount: maxRateExceedCount,
              totalExceed: minRateExceedCount + maxRateExceedCount,
              second: timer,
            },
          ]);
          // setState([{ heartRate: 100, time: 0 }]);
          break;
      }
    }
  }, [timer, heartRate, workoutName]);

  const handleMaxChange = (max) => {
    setMaxRate(max);
  };

  const handleMinChange = (min) => {
    setMinRate(min);
  };

  const handleMaxMinChange = (min, max) => {
    setMaxMinRate({ min, max });
  };

  const handleWorkoutNameChange = (workoutName) => {
    setWorkoutName(workoutName);
  };

  console.log("miband", miband);
  // let miband;
  // function delay(ms) {
  //     return new Promise(resolve => setTimeout(resolve, ms))
  //   }
  async function onHeartRate(rate) {
    console.log("Heart Rate:", rate);
    setHeartRate(rate);
    if (rate > maxRate) {
      console.log("you exceed max heart rate limit", rate);
      console.log("maxRate bound compare", maxRate);
      await miband.showNotification("vibrate");
      setTimeout(async () => {
        await miband.showNotification("vibrate");
      }, 1000);
      setMaxRateExceedCount((prevMaxRateExceedCount) => prevMaxRateExceedCount + 1);
    } else if (rate < minRate) {
      console.log("minRate bound compare", minRate);

      console.log("Be carefull you exceed min heart rate limit", rate);
      await miband.showNotification("vibrate");
      setMinRateExceedCount((prevMinRateExceedCount) => prevMinRateExceedCount + 1);
    }
  }

  useEffect(() => {
    startHeartRate();
  }, [maxRate, minRate]);
  const startHeartRate = useCallback(async () => {
    if (!miband) {
      return;
    }
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
                  amount: `${state === "Device Connected" ? "Connected" : state} `,
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
                setTimer={setTimer}
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
                handleWorkoutNameChange={handleWorkoutNameChange}
              />
            </Grid>
            {/* <Grid item xs={12} md={12} lg={12}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>

        <MDBox mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <HistoryLineChart
                  heartData={stateHearRateWithTimer}
                  color="info"
                  title="Heart Rate Monitoring During Seconds"
                  // description="Last 10 Performance"
                  date="last update 2 days ago"
                  // chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <HistoryBarChart
                  missHeartData={numberOfExceedHeartRateData}
                  color="info"
                  title="Number of Exceed Heart Rate"
                  // description="Last 10 Performance"
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
