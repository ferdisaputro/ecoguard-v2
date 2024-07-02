import axios from "axios";
import { useEffect, useState } from "react";
import { getWeatherData } from "../routes";
import { getDatabase, onValue, ref } from "firebase/database";

function Weather() {
   const db = getDatabase();
   const dbvalue = ref(db);

   const [locations, setLocations] = useState([]);
   const [weatherData, setWeatherData] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      onValue(dbvalue, (snapshot) => {
         const data = snapshot.val();
         if (data.latitude && data.longitude) {
            setLocations([{id: 0, name: "Ecoguard - 1", coordinates: [data.latitude, data.longitude], description: "Kampus 4 Sidoarjo" }]);
         } else {
            setLocations([]);
         }
         setLoading(false);
      })
   }, []);

   useEffect(() => {
      if (!loading && locations.length > 0 && locations[0].coordinates.length === 2) {
         const coordinates = locations[0].coordinates.join(',');
         weatherDataGetter(coordinates);
      }
   }, [locations, loading]);

   const weatherDataGetter = async (coordinates) => {
      await getWeatherData(coordinates)
            .then(response => setWeatherData(response))
            .catch(error => {
               console.error("Error fetching weather data:", error);
               setWeatherData(null);
            });
   }

   return (
      <div className="space-y-3">
         <div>
            <h6 className="text-xl">Kota: </h6>
            <h3 className="text-2xl font-bold">{ weatherData ? weatherData.location.name : "-" }</h3>
         </div>
         <div>
            <h6 className="text-xl">Provinsi:</h6>
            <h3 className="text-2xl font-bold">{ weatherData ? weatherData.location.region : "-" }</h3>
         </div>
         <div>
            <h6 className="text-xl">Kondisi cuaca:</h6>
            <h3 className="text-2xl font-bold">
               <img src={ weatherData ? weatherData.current.condition.icon : ""} alt="weather icon" className="-mb-4" /> 
               { weatherData ? weatherData.current.condition.text : "-" }
            </h3>
         </div>
      </div>
   );
}

export default Weather;
