import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useMemo, useState } from "react";
// import Grid from "../Components/Grid";
import { stockData } from "../testData";
// import { ApiResponse, StockData } from "../services/interfaces";
import {
  CustomSelectOptions,
  CardsData,
  columnData,
  convertToStockDataArray,
  filterData,
} from "../services/utils";
import Cards from "../Components/Cards";

import CustomSelect from "../Components/CustomSelect";
import Charts from "../Components/Charts";
import {
  CustomSelectProps,
  StockData,
  filteredData,
} from "../services/interfaces";
import Grid from "../Components/Grid";
import CustomModal from "../Components/Modal";
import GetData from "../services/httpServices";

const StockDetail = () => {
  const [data, setData] = useState<StockData[]>([]);
  const [filteredData, setFilteredData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cardsData, setCardsData] = useState<CardsData | null>();
  const [selectedOption, setSelectedOption] = useState<
    CustomSelectProps["options"][0]
  >({ value: "all", label: "All" });

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isInital, setIsInital] = useState(false);
  const [symbolName, setSymbolName] = useState("");

  const openModal = (initial: boolean = false) => {
    setIsOpen(true);
    setIsInital(initial);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbolName(event.target.value.toUpperCase());
  };

  const updateData = () => {
    try {
      const filter = filterData(selectedOption.value, data);
      const { filteredData, ...rest } = filter;
      setFilteredData(filteredData as StockData[]);
      setCardsData({ ...rest });
    } catch (err) {
      console.warn(err);

    } finally {
    }
  };
  const handleSubmit = () => {
    try {
      if (symbolName.trim() !== "") {
        GetData(symbolName).then((res) => {
          setLoading(true);
          const newData = convertToStockDataArray(res.data);
          setData(newData);
          const filter = filterData(selectedOption.value, newData);
          const { filteredData, ...rest } = filter;
          setFilteredData(filteredData as StockData[]);
          setCardsData({ ...rest });
        });
        closeModal();
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    updateData();
  }, [selectedOption]);
  useEffect(() => {
    openModal(true);
  }, []);

  const columnDefs = useMemo(() => columnData, []);
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <p className="text-[25px] font-semibold ">Symbol Name: {symbolName}</p>
        <div className="flex lg:gap-x-4 gap-y-4 lg:flex-row flex-col flex-wrap">
          <Cards
            loading={loading}
            cardsData={cardsData as CardsData}
            apperance="high"
          />
          <Cards
            loading={loading}
            cardsData={cardsData as CardsData}
            apperance="low"
          />
          <Cards
            loading={loading}
            cardsData={cardsData as CardsData}
            apperance="performance"
          />
          <div className="flex items-center w-[50%]">
            <button
              className="text-white w-[30%]  bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-1 text-sm py-2.5 text-center"
              onClick={() => openModal()}
            >
              Add Symbol
            </button>
          </div>
        </div>
        <div className="flex bg-white shadow-custom p-1 rounded-1 justify-between">
          <p className=" text-[25px] font-semibold ">Stock Performance Chart</p>

          <CustomSelect
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
            options={CustomSelectOptions}
          />
        </div>
        <div className="flex  md:gap-x-4 flex-wrap md:flex-row flex-col gap-y-4">
          <div className="flex-1 bg-white rounded-1 shadow-custom p-1">
            <Charts  loading={loading} data={filteredData} type="Bar" />
          </div>
          <div className="flex-1 flex bg-white shadow-custom p-1 rounded-1">
            <Charts loading={loading} data={filteredData} type="Line" />
          </div>
        </div>
        <div className="p-1 bg-white shadow-custom rounded-1 ">
          <Grid
            height={"50vh"}
            columnDefs={columnDefs}
            rowData={filteredData}
          />
        </div>
      </div>
      <CustomModal
        handleSubmit={handleSubmit}
        onInputChange={handleInputChange} // Pass the input change handler as a prop
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        initial={isInital}
        symbolName={symbolName} // Pass the symbolName as a prop
      />
    </>
  );
};

export default StockDetail;
