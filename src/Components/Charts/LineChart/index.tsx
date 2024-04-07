// import React from "react";
// import { Line } from "react-chartjs-2";
// import { BarController, Chart as ChartJS, LineController } from "chart.js/auto";
// import { StockData } from "../../../services/interfaces";
// ChartJS.register(BarController, LineController);
// interface LineChartProps {
//   data: StockData[];
// }
// function LineChart({ data }: LineChartProps) {
//   const chartData = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//       {
//         label: "Number of Users",
//         data: [65, 59, 80, 81, 56, 55, 40],
//         backgroundColor: "#E157711A",
//         borderWidth: 3,
//         fill: true,
//         tension: 0.4,
//         pointBackgroundColor: "#E15771",
//         borderColor: "#E15771",
//       },
//     ],
//   };
//   return (
//     <div className="w-full h-full">
//       <Line
//         data={chartData}
//         options={{
//           aspectRatio: 2,
//           scales: {
//             x: {
//               type: "category",
//               title: {
//                 display: true,
//                 text: "Year",
//               },
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: "Users",
//               },
//             },
//           },
//           plugins: {
//             legend: {
//               display: true,
//               position: "top",
//             },
//           },
//           elements: {
//             line: {
//               tension: 0.4, // Adjust the tension to control the curve, between 0 and 1
//             },
//           },
//         }}
//       />
//     </div>
//   );
// }

// export default LineChart;
import React from "react";
import zoomPlugin from "chartjs-plugin-zoom";

import { Line } from "react-chartjs-2";
import { BarController, Chart as ChartJS, LineController } from "chart.js/auto";
import { StockData } from "../../../services/interfaces";
ChartJS.register(BarController, LineController, zoomPlugin);

interface LineChartProps {
  data: StockData[];
}

const LineChart = ({ data }: LineChartProps) => {
  const options = {
    aspectRatio: 2,

    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          pinch: {
            enabled: true, // Enable pinch zooming
          },
          wheel: {
            enabled: true, // Enable wheel zooming
          },
          mode: "x",
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Adjust the tension to control the curve, between 0 and 1
      },
    },
  };
  const chartData = {
    labels: data.map((data) => data?.date.toString()),

    datasets: [
      {
        label: "Open",
        data: data.map((data) => data.open),
        backgroundColor: "#E157711A",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#E15771",
        borderColor: "#E15771",
      },
      {
        label: "Close",
        data: data.map((data) => data.adjustedClose),
        backgroundColor: "#7A88A61A",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#7A88A6",
        borderColor: "#7A88A6",
      },
    ],
  };

  return (
    <div className="w-full h-full">
      {/* @ts-ignore */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
