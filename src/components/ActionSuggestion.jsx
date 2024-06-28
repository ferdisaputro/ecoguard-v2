import { useEffect, useState } from "react";
import { assessWaterConditions } from "./assessWaterCondition";

function ActionSuggestion({data}) {
   const {ph, turbidity, waveLevel} = data;
   const [phStatus, setPhStatus] = useState(null);
   const [turbidityStatus, setTurbidityStatus] = useState(null);
   const [waveLevelStatus, setWaveLevelStatus] = useState(null);
   const [rekomendasi, setRekomendasi] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const data = assessWaterConditions(ph, turbidity, waveLevel);
      setPhStatus(data.phStatus);
      setTurbidityStatus(data.turbidityStatus);
      setWaveLevelStatus(data.waveLevelStatus);
      setRekomendasi(data.rekomendasi);
      setLoading(false);
   }, []);

   const RenderRows = () => {
      // console.log(assessWater);
      let index = 1; // Initialize the index for auto increment
      
      return (
         <>
            <tr className="border-b" key={index++}>
               <td className="px-2 py-1.5">{index}</td>
               <td className="px-2 py-1.5">{phStatus.keterangan}</td>
               <td className="px-2 py-1.5">{phStatus.deskripsi}</td>
               <td className="px-2 py-1.5">{phStatus.catatan}</td>
            </tr>
            
            
            <tr className="border-b" key={index++}>
               <td className="px-2 py-1.5">{index}</td>
               <td className="px-2 py-1.5">{turbidityStatus.keterangan}</td>
               <td className="px-2 py-1.5">{turbidityStatus.deskripsi}</td>
               <td className="px-2 py-1.5">{turbidityStatus.catatan}</td>
            </tr>

            <tr className="border-b" key={index++}>
               <td className="px-2 py-1.5">{index}</td>
               <td className="px-2 py-1.5">{waveLevelStatus.keterangan}</td>
               <td className="px-2 py-1.5">{waveLevelStatus.deskripsi}</td>
               <td className="px-2 py-1.5">{waveLevelStatus.catatan}</td>
            </tr>

            {rekomendasi.map((item) => (
               <tr className="border-b" key={index++}>
               <td className="px-2 py-1.5">{index}</td>
               <td className="px-2 py-1.5">{item.keterangan}</td>
               <td className="px-2 py-1.5">{item.deskripsi}</td>
               <td className="px-2 py-1.5">{item.catatan}</td>
               </tr>
            ))}
         </>
      );
   };

   return (
      <div className="px-20 py-5 mt-7">
         <h2 className="text-4xl text-center font-semibold">Peringatan Kondisi Sungai</h2>
         <table className="table-auto mt-3 w-full">
            <thead>
               <tr className="border-b">
                  <th className="text-lg py-1">No</th>
                  <th className="text-lg py-1">Keterangan</th>
                  <th className="text-lg py-1">Deskripsi</th>
                  <th className="text-lg py-1">Catatan</th>
               </tr>
            </thead>
            <tbody>
               {loading? <tr><td colSpan={4}>waiting...</td></tr> : <RenderRows></RenderRows>}
            </tbody>
         </table>
      </div>
   );
}

export default ActionSuggestion;