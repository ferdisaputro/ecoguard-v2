import { useRef, useEffect, useState } from "react";

import MapsApi from "../components/MapsApi";

const Homepage = () => {
   return (
      <div className="text-[#F6E9B2] pt-14 h-[100vh] relative">
         <div className="px-20">
            <h6 className="w-full md:w-1/2 text-xl mt-10">EcoGuard adalah inovasi revolusioner dalam pemungutan sampah di sungai, dirancang untuk meningkatkan efisiensi dan efektivitas proses pembersihan.</h6>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center -mt-10 space-y-5 lg:space-y-0">
            <div className="text-end -me-12 mt-16">
               <ul className="space-y-10">
                  <li className="flex lg:-mr-24 items-center justify-end space-x-3">
                     <div className="text-white">
                        <span className="text-lg">Kebersihan Sungai yang Terjaga</span>
                        <hr></hr>
                        <span className="text-sm">Mengurangi dan mencegah pencemaran ekosistem</span>
                     </div>
                     <h4 className="font-semibold text-4xl">1</h4>
                  </li>
                  <li className="flex lg:-mr-11 items-center justify-end space-x-3">
                     <div className="text-white">
                        <span className="text-lg">Efisiensi yang Meningkat</span>
                        <hr></hr>
                        <span className="text-sm">Proses pembersihan yang lebih cepat dan lebih efisien</span>
                     </div>
                     <h4 className="font-semibold text-4xl">2</h4>
                  </li>
                  <li className="flex lg:-mr-4 items-center justify-end space-x-3">
                     <div className="text-white">
                        <span className="text-lg">Terintegrasi dengan Web</span>
                        <hr></hr>
                        <span className="text-sm">Memudahkan pemerintah dan masyarakat melalui website</span>
                     </div>
                     <h4 className="font-semibold text-4xl">3</h4>
                  </li>
                  <li className="flex items-center justify-end space-x-3">
                     <div className="text-white">
                        <span className="text-lg">Layanan Google Maps</span>
                        <hr></hr>
                        <span className="text-sm">Menyediakan data lokasi posko, jarak, dan kebutuhan</span>
                     </div>
                     <h4 className="font-semibold text-4xl">4</h4>
                  </li>
               </ul>
            </div>

            <div className="w-full lg:w-full lg:max-w-[750px] ml-auto">
               <div className="lg:rounded-ss-[3000px] aspect-h-6 aspect-w-7  overflow-hidden lg:border-s-8 lg:border-t-8 border-[#7ABA78]">
                  {/* <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d31656.228215044463!2d112.72696702178187!3d-7.350693128572937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMjEnMDIuNSJTIDExMsKwNDQnMTguNyJF!5e0!3m2!1sid!2sid!4v1718295148974!5m2!1sid!2sid" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full"></iframe>
                  <div id="map" className="map w-full h-full"></div> */}
                  <MapsApi></MapsApi>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Homepage;