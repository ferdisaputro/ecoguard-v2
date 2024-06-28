import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ChartCanva = ({ chartData }) => {
   const data = chartData;
   
   if (!data) {
      return <div>Loading...</div>;
   }


   const options = {
      responsive: true,
      maintainAspectRation: false,
      scales: {
         y: {
            beginAtZero: true,
         },
      },
   };


   return (
      <div className="w-full h-full flex items-center">
         <Line data={data} options={options} />
      </div>
   );
};

export default ChartCanva;