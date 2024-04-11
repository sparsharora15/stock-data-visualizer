import { StockData } from "../../services/interfaces";
import Loader from "../Loader";
import { BarChart } from "./BarChart";
import LineChart from "./LineChart";

interface ChartsProps {
  type: "Bar" | "Line";
  loading: boolean;
  data: StockData[];
}
const renderCharts = (type: "Bar" | "Line", data: StockData[]) => {
  switch (type) {
    case "Bar":
      return <BarChart data={data} />;
    case "Line":
      return <LineChart data={data} />;
    default:
      return null;
  }
};
const Charts = ({ type, data, loading }: ChartsProps) => (
  <>{loading ? <Loader /> : renderCharts(type, data)}</>
);

export default Charts;
