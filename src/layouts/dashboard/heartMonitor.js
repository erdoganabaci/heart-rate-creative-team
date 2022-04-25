import { 
    // useEffect, 
    useState } from 'react'
import MiBand from './miband';
// const bluetooth = require('webbluetooth').bluetooth;
// const MiBand = require('../src/miband');

const HeartMonitor = () => {
    const bluetooth = navigator.bluetooth;
    const [state, setState] = useState("");
    const [battery, setBattery] = useState("");
    const [heartRate,
         setHeartRate
        ] = useState("");
        const [miband,
            setmiband
           ] = useState();
    // let miband;
    // function delay(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms))
    //   }

    const startHeartRate = async () => {
        miband.on('heart_rate', async (rate) => {
                console.log('Heart Rate:', rate)
                setHeartRate(rate);
                if(rate >= 80){
                  console.log("you exceed heart rate limit",rate)
                //   await miband.showNotification('vibrate');
                }
              })
              await miband.hrmStart().then(async () => {
                console.log("hrmStart");
              });
    }
    const stopHeartRate = async () => {
        await miband.hrmStop().then(async () => {
            console.log("miHrmStop");
            // await miband.showNotification('vibrate');
          });
    }
    const scan = async () => {
        if (!bluetooth) {
            console.log('WebBluetooth is not supported by your browser!');
            return;
        }

        try {

            console.log('Requesting Bluetooth Device...');
            setState("Requesting Bluetooth Device...")
            const device = await bluetooth.requestDevice({
                filters: [
                    { services: [MiBand.advertisementService] }
                ],
                optionalServices: MiBand.optionalServices
            });

            device.addEventListener('gattserverdisconnected', () => {
                console.log('Device disconnected');
                setState("Device disconnected")

            });

            console.log('Connecting to the device...');
            setState("Connecting to the device...")
            const server = await device.gatt.connect();
            console.log('Connected');
            setState("Device Connected")

            const miband = new MiBand(server);
            setmiband(miband);
            await miband.init();

            console.log("getBatteryInfo ",await miband.getBatteryInfo());
            await miband.getBatteryInfo().then(res => {
                setBattery(res.level)
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
            console.log('Argh!', error);
        }
    }
    //   useEffect(() => {
    //     scan();

    //   },[]);

    return (
        <div>
            heartMonitor
            <div>{state}</div>
            <div>Battery Level: {battery}</div>
            <div>Heart Rate: {heartRate}</div>

            <button onClick={scan}>
                Scan
            </button>

            <button onClick={startHeartRate}>
                Start Heart Rate
            </button>

            <button onClick={stopHeartRate}>
                Stop Heart Rate
            </button>
        </div>
    )
}

export default HeartMonitor