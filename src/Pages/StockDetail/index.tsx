import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cards from "../../Components/Cards";
import { IoMdArrowBack } from "react-icons/io";
import CustomSelect from "../../Components/CustomSelect";
import {
  CardsData,
  CustomSelectOptions,
  columnData,
  decodeToken,
  filterData,
} from "../../services/utils";
import { CustomSelectProps, StockData } from "../../services/interfaces";
import Charts from "../../Components/Charts";
import DataTable from "../../Components/DataTable";
import { getStockDetail } from "../../services/httpServices";

const StockDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<StockData[]>([]);
  const [filteredData, setFilteredData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cardsData, setCardsData] = useState<CardsData>();
  const [selectedOption, setSelectedOption] = useState<
    CustomSelectProps["options"][0]
  >({ value: "all", label: "All" });

  const [symbolName, setSymbolName] = useState("");

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

  const getStock = async () => {
    try {
      setLoading(true);
      const userData = await decodeToken();

      const res = await getStockDetail(
        userData?.deCodedToken?.payload?._id as string,
        id as string
      );
      if (res.status === 200) {
        setSymbolName(res.data.symbol);
        setData(res.data.data);
        const filter = filterData(selectedOption.value, res.data.data);
        const { filteredData, ...rest } = filter;
        setFilteredData(filteredData);
        setCardsData({ ...rest });
      }
      console.log(res);
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
    getStock();
  }, []);

  const columns = useMemo(() => columnData, []);
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <IoMdArrowBack className="cursor-pointer" onClick={() => navigate("/")} />
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
        </div>
        <div className="flex bg-white shadow-custom p-[1rem] rounded justify-between">
          <p className=" text-[25px] font-semibold ">Stock Performance Chart</p>

          <CustomSelect
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
            options={CustomSelectOptions}
          />
        </div>
        <div className="flex  md:gap-x-4 flex-wrap md:flex-row flex-col gap-y-4">
          <div className="flex-1 bg-white rounded-1 shadow-custom p-1">
            <Charts loading={loading} data={filteredData} type="Bar" />
          </div>
          <div className="flex-1 flex bg-white shadow-custom p-1 rounded-1">
            <Charts loading={loading} data={filteredData} type="Line" />
          </div>
        </div>
        <div
          style={{ scrollbarWidth: "none" }}
          className="p-[1rem] bg-white shadow-custom rounded overflow-auto h-[60vh] overflow-y-auto"
        >
          <DataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </>
  );
};

export default StockDetail;
