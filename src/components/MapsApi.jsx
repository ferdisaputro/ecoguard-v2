import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useRef, useState } from 'react';

const MapsApi = () => {
   const mapElement = useRef();
   const mapRef = useRef();

   // for multiple robot
   const [locations, setLocations] = useState(null)

   const db = getDatabase();
   const dbvalue = ref(db);

   useEffect(() => {
      onValue(dbvalue, (snapshot) => {
         const data = snapshot.val();
         setLocations([{id: 0, name: "Ecoguard - 1", coordinates: [data.longitude, data.latitude], description: "Kampus 4 Sidoarjo" }]);
      })
   }, []);

   useEffect(() => {
      if (locations) {
         mapsConf();
         mapsClickHadling();
         console.log('true');
      }
   }, [locations])

   const navigate = useNavigate();
   
   const createMarker = (location) => {
      const marker = new Feature({
         geometry: new Point(fromLonLat(location.coordinates)),
         name: location.name,
         description: location.description,
         coordinates: location.coordinates,
      });
      
      marker.setStyle(new Style({
         image: new Icon({
            anchor: [0.5, 1],
            src: './assets/icons/marker.png',
            scale: .1
         })
      }));
   
   return marker;
   };

   const mapsConf = () => {
      const vectorSource = new VectorSource({
         features: locations.map(createMarker),
      });

      const vectorLayer = new VectorLayer({
         source: vectorSource,
      });

      // let center;
      // if (!attr.get("coordinate")) {
      //    center = [
      //       locations[0].coordinates[0] - .003,
      //       locations[0].coordinates[1]
      //    ];
      // } else {
      //    center = attr.get("coordinate").split(",");
      // }

      const initialMap = new Map({
         target: mapElement.current,
         layers: [
         new TileLayer({
            source: new OSM(),
         }),
         vectorLayer,
         ],
         view: new View({
         center: fromLonLat([locations[0].coordinates[0],locations[0].coordinates[1]]),
         zoom: 15,
         }),
      });

      mapRef.current = initialMap;

      return () => {
         initialMap.setTarget(null);
      };
   }

   const mapsClickHadling = () => {
      const handleMapClick = (event) => {
         const feature = mapRef.current.forEachFeatureAtPixel(event.pixel, (feature) => {
            return feature;
         });

         if (feature) {
            navigate(`/dashboard?coordinate=${feature.get('coordinates')}`);
         }
      };

      mapRef.current.on('click', handleMapClick);

      return () => {
         mapRef.current.un('click', handleMapClick);
      };
   }

   return (
      <div ref={mapElement} className="w-full h-full"></div>
   );
}

export default MapsApi;