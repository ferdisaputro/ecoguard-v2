import { useEffect, useRef, useState } from "react";
import ChartCanva from "../components/LineChart";
import { firebaseApp } from "../firebase-config";
import { getDatabase, onValue, ref } from "firebase/database";
import firebase from "firebase/compat/app";
import MapsApi from "../components/MapsApi";
import ActionSuggestion from "../components/ActionSuggestion";
import Weather from "../components/Weather";

function Dashboard () {

   // Generate days array from 1 to 29
   const days = Array.from({ length: 29 }, (_, i) => i + 1);

   // Generate random values array
   const values = days.map(() => Math.floor(Math.random() * 50) + 1);

   // chart.js data
   const [chartData, setChartData] = useState(null);

   // firebase database
   const db = getDatabase();
   const dbvalue = ref(db);

   const [waterStatus, setWaterStatus] = useState([]);
   const [waterDangerLevel, setWaterDangerLevel] = useState([]);

   const [turbidity, setTurbidity] = useState(null);
   const [turbidityLevel, setTurbidityLevel] = useState(null);

   const [ph, setPh] = useState(null);
   const [waterQuality, setWaterQuality] = useState(null);

   const [waveLevel, setWaveLevel] = useState(null);
   const [realWaveLevel, setRealWaveLevel] = useState(null);

   const [pollutionLevel, setPollutionLevel] = useState(null);

   useEffect(() => {
      // Data for the chart
      const chartData = {
         labels: days.map(day => 'Day ' + day),
         datasets: [
            {
               label: 'Daily Waste',
               backgroundColor: 'rgba(75, 192, 192, 0.2)',
               borderColor: 'rgba(75, 192, 192, 1)',
               data: values,
               fill: true
            },
         ],
      };

      setChartData(chartData);

      onValue(dbvalue, (snapshot) => {
         const data = snapshot.val();

         setWaterDangerLevel(checkWaterDangerLevel(data.waveLevel));

         setPh(data.ph.toString().substr(0, 3));
         setWaterQuality(waterCategory(data.ph));
         
         setTurbidity(data.turbidity);
         setTurbidityLevel(turbidityCategory(data.turbidity));

         setWaveLevel(checkWaveLevel(data.waveLevel));

         setWaterStatus(checkWaterStatus(data.ph, data.turbidity));

         setPollutionLevel(checkPollutionLevel(data.ph, data.turbidity));

         setRealWaveLevel(data.waveLevel)
      });
   }, []);

   const checkWaveLevel = (waveLevel) => {
      if (waveLevel == "Permukaan air tenang") return "tenang";
      if (waveLevel == "Permukaan air stabil") return "tenang";
      if (waveLevel == "Permukaan air bergelombang") return "bergelombang";
      if (waveLevel == "Permukaan air sangat deras") return "sangat deras";
   }

   const checkPollutionLevel = (ph, turbidity) => {
      let category = "";
      
      if (ph >= 6.5 && ph <= 8.5) {
         // pH Netral
         if (turbidity < 1) {
            category = "Rendah";
         } else if (turbidity >= 1 && turbidity <= 100) {
            category = "Sedang";
         } else {
            category = "Tinggi";
         }
      } else {
         // pH Asam atau Basa
         if (turbidity < 1) {
            category = "Sedang";
         } else if (turbidity >= 1 && turbidity <= 100) {
            category = "Sedang";
         } else {
            category = "Tinggi";
         }
      }
      
      return category;
   }

   const checkWaterDangerLevel = (level) => {
      // Permukaan air tenang, 
      // Permukaan air stabil, 
      // Permukaan air bergelombang,
      // Gelombang air sangat deras

      // Tidak Berbahaya (Safe):
      // Peringatan (Caution):
      // Bahaya (Dangerous):
      // Sangat Berbahaya (Very Dangerous):

      if (level == "Permukaan air tenang") return "Safe";
      if (level == "Permukaan air stabil") return "Safe";
      if (level == "Permukaan air bergelombang") return "Peringatan";
      if (level == "Permukaan air sangat deras") return "Bahaya";
   }

   const checkWaterStatus = (ph, turbidity) => {
      // Excellent: pH 6.5 - 7.5 and Turbidity < 5 NTU
      // Good: pH 6.5 - 7.5 and Turbidity 5 - 50 NTU
      // Fair: pH 6.5 - 7.5 and Turbidity > 50 NTU
      // Poor: pH < 6.5 and any Turbidity
      // Poor: pH > 7.5 and Turbidity > 50 NTU

      // Excellent: "#0099ff",
      // Good: "#00cc00",
      // Fair: "#ffff00",
      // Poor: "#ff0000",

      return (ph >= 6.5 && ph <= 8 && turbidity < 10)? ["Excellent", "#0099ff"]
         : (ph >= 6.5 && ph <= 8 && turbidity >= 10 && turbidity <= 60)? ["Good", "#00cc00"]
         : (ph >= 6.5 && ph <= 8 && turbidity > 60)? ["Fair", "#ffff00"]
         : (ph < 6.5)? ["Poor", "#ff0000"]
         : ["Poor", "#ff0000"]
      
   }

   const waterCategory = (ph) => {
      if (ph > 6.5 && ph < 8.5) return "Aman";
      else if (ph < 4 || ph > 10) return "Bahaya";
      else return "Tercemar";
   }

   const turbidityCategory = (turbidity) => {
      if (turbidity >= 0 && turbidity <= 5) return 'Sangat Jernih';
      else if (turbidity > 5 && turbidity <= 20) return 'Jernih';
      else if (turbidity > 20 && turbidity <= 50) return 'Sedang';
      else if (turbidity > 50 && turbidity <= 100) return 'Keruh';
      else if (turbidity > 100 && turbidity <= 500) return 'Sangat Keruh';
      else return 'Ekstrem';
   };
   

   return (
   <div className="pt-20 text-[#F6E9B2] px-4 md:px-16 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
         <div className="flex">
            <div className="overflow-hidden -translate-y-12 grid place-items-center flex-1">
               <div className="meter-container aspect-1 w-3/4">
                  <div className={`meter ${waterStatus[0]? waterStatus[0].toLowerCase() : "#ffffff"}`}></div>
                  <div className="inbar"></div>
                  <div className="desc">
                     <div className="status text-2xl -mb-0.5">{waterStatus[0]}</div>
                     <div className="detail text-sm">{ `${ph} - ${turbidity} NTU` }</div>
                  </div>
               </div>
            </div>
            <div className="flex flex-col justify-center space-y-1">
               <div className={`bg-[#0A6847] w-fit h-fit rounded-xl px-8 py-2 text-white water-flow relative`}>
                  <h6 className="-mb-1">Status gelombang</h6>
                  <p className="font-semibold">{ waterDangerLevel }</p>
               </div>
               <div>
                  {/* <h5>estimasi penuh <span className="text-2xl font-semibold text-end">2H</span></h5> */}
               </div>
            </div>
         </div>
         <div className="rounded-2xl bg-white overflow-hidden min-h-56 w-full">
            <MapsApi zoom="15"></MapsApi>
         </div>
      </div>

      {/* <p className="text-white">pengangkutan limbah harian</p> */}
      <div className="grid grid-cols-1 md:grid-cols-5 mt-7 gap-5">
         <div className="border-s-4 border-s-gray-500 flex flex-col ps-5 justify-between gap-3 col-span-2">
               <div className="rounded-xl py-3 px-5 bg-gradient-to-r from-[#0A6847] via-[#0A6847] to-[#a8a8a8]">
                  <ul className="flex gap-4 items-center">
                     <li>
                        <img src="/assets/icons/trash-restore.svg" alt="icon" className="h-6"></img>
                     </li>
                     <li className="grow">
                        <p className="text-white">Level PH - {ph}</p>
                     </li>
                     <li>
                        <h6 className="text-2xl font-semibold text-end">{waterQuality}</h6>
                     </li>
                  </ul>
               </div>
               <div className="rounded-xl py-3 px-5 bg-gradient-to-r from-[#00215E] via-[#00215E] to-[#a8a8a8]">
                  <ul className="flex gap-4 items-center">
                     <li>
                        <img src="/assets/icons/trash-restore.svg" alt="icon" className="h-6"></img>
                     </li>
                     <li className="grow">
                        <p className="text-white">Tingkat Kekeruhan - {turbidity} NTU</p>
                     </li>
                     <li>
                        <h6 className="text-2xl font-semibold text-end">{turbidityLevel}</h6>
                     </li>
                  </ul>
               </div>
               <div className="rounded-xl py-3 px-5 bg-gradient-to-r from-[#32012F] via-[#32012F] to-[#a8a8a8]">
                  <ul className="flex gap-4 items-center">
                     <li>
                        <img src="/assets/icons/trash-restore.svg" alt="icon" className="h-6"></img>
                     </li>
                     <li className="grow">
                        <p className="text-white">Tingkat gelombang</p>
                     </li>
                     <li>
                        <h6 className="text-2xl font-semibold text-end">{waveLevel}</h6>
                     </li>
                  </ul>
               </div>
               <div className="rounded-xl py-3 px-5 bg-gradient-to-r from-[#E65C19] via-[#E65C19] to-[#a8a8a8]">
                  <ul className="flex gap-4 items-center">
                     <li>
                        <img src="/assets/icons/trash-restore.svg" alt="icon" className="h-6"></img>
                     </li>
                     <li className="grow">
                        <p className="text-white">Tingkat tercemar</p>
                     </li>
                     <li>
                        <h6 className="text-2xl font-semibold text-end">{pollutionLevel}</h6>
                     </li>
                  </ul>
               </div>
         </div>

         <div className="bg-white rounded-2xl grow col-span-2 py-3 px-2">
            <ChartCanva chartData={chartData} />
         </div>

         <Weather ></Weather>
      </div>
      {/* {(ph && turbidity && waveLevel)? <ActionSuggestion ph={ph} turbidity={turbidity} waveLevel={waveLevel} ></ActionSuggestion> : "" } */}
      {(ph && turbidity && waveLevel)? <ActionSuggestion data={{ ph: ph, turbidity: turbidity, waveLevel: realWaveLevel }} ></ActionSuggestion> : "Loading..." }
   </div>
   );
}

export default Dashboard;