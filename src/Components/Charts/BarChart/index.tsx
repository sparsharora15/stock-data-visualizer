import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import {
  BarController,
  Chart as ChartJS,
  LineController,
  PieController,
} from "chart.js/auto";
import { ChartData, StockData } from "../../../services/interfaces";
import { barChartOption, generateChartData } from "../../../services/utils";
ChartJS.register(BarController, LineController, PieController, zoomPlugin);

interface BarChartProps {
  data: StockData[];
}


export const BarChart = ({ data }: BarChartProps) => {

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    setChartData(generateChartData(data));
  }, [data]);
  return (
    <>
      <div className="">
        <Bar
          className=" "
          data={chartData}
          // @ts-ignore
          options={barChartOption}
        />
      </div>
    </>
  );
};
