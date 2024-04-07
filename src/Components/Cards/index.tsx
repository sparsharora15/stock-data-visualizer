import React from "react";
import { BiLineChart } from "react-icons/bi";
import { BiLineChartDown } from "react-icons/bi";
import { FiChevronsDown } from "react-icons/fi";
import { LuChevronsUp } from "react-icons/lu";
import { GiGrowth } from "react-icons/gi";
import { MdCandlestickChart } from "react-icons/md";
import { CardsData } from "../../services/utils";
import Loader from "../Loader";

interface CardProps {
  apperance: "high" | "low" | "performance";
  cardsData: {
    maxHigh: number;
    maxLow: number;
    performance: number;
  };
  loading: boolean;
}
const renderCards = (
  apperance: "high" | "low" | "performance",
  cardsData: CardsData
) => {
  if (cardsData) {
    const { maxHigh, maxLow, performance } = cardsData;
    switch (apperance) {
      case "high":
        return <MaxHigh high={maxHigh} />;

      case "low":
        return <MaxLow low={maxLow} />;
      case "performance":
        return <Performance performance={performance} />;

      default:
        return <></>;
    }
  }
};
const MaxHigh = ({ high }: { high: number }) => {
  return (
    <>
      <div className="w-[30%] p-[15px]">
        <BiLineChart className="w-[2.5rem] h-[2.5rem]" color="green" />
      </div>
      <div className="  flex flex-col text-[green] justify-evenly">
        <p className="text-[21px] font-semibold ">High</p>
        <p className="flex items-center">
          {high} <LuChevronsUp />
        </p>
      </div>
    </>
  );
};
const MaxLow = ({ low }: { low: number }) => {
  return (
    <>
      <div className="w-[30%] p-[15px]">
        <BiLineChartDown className="w-[2.5rem] h-[2.5rem]" color="red" />
      </div>
      <div className="  flex flex-col text-[red] justify-evenly">
        <p className="text-[21px] font-semibold ">Low</p>
        <p className="flex items-center">
          {low} <FiChevronsDown />
        </p>
      </div>
    </>
  );
};

const Performance = ({ performance }: { performance: number }) => {
  const number = performance.toFixed(2); // Format performance to 2 decimal places
  const isNegative = performance < 0;

  return (
    <>
      <div className="w-[30%] p-[15px]">
        <MdCandlestickChart
          className="w-[2.5rem] h-[2.5rem]"
          color={isNegative ? "red" : "green"}
        />
      </div>
      <div
        className={`flex flex-col text-[${
          isNegative ? "red" : "green"
        }] justify-evenly`}
      >
        <p className="text-[21px] font-semibold">Performance</p>
        <p
          className={`flex items-center ${
            isNegative ? "text-red" : "text-green"
          }`}
        >
          {number}%{" "}
          <GiGrowth className={isNegative ? "text-red" : "text-green"} />
        </p>
      </div>
    </>
  );
};

const Cards = ({ apperance, cardsData, loading }: CardProps) => {
  return (
    <>
      <div className="cursor-pointer lg:w-[20%]   flex p-1 bg-white w-[50%] rounded-1 shadow-custom">
        {!loading ? <Loader /> : renderCards(apperance, cardsData)}
      </div>
    </>
  );
};

export default Cards;
