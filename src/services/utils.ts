import {
  ApiResponse,
  ChartData,
  CustomSelectProps,
  StockData,
  filteredData,
} from "./interfaces";

export const barChartOption = {
  responsive: true,
  plugins: {
    title: {
      display: true,
    },
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
      },
      zoom: {
        pinch: {
          enabled: true,
        },
        wheel: {
          enabled: true,
        },
        mode: "x",
      },
    },
  },
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
      grouped: true,
      title: {
        display: true,
        text: "Price",
      },
    },
  },
};
export const columnData = [
  {
    headerName: "Adjusted Close",
    field: "adjustedClose",
    headerClass: "ag-header-custom",
    tooltipField: "Adjusted Close",
    flex: 1,
    sortable: false,
    pinned: "left",
  },
  {
    headerName: "Close",
    field: "close",
    headerClass: "ag-header-custom",
    tooltipField: "Close",
    flex: 1,
    sortable: false,
    // pinned: "left",
  },
  {
    headerName: "Date",
    field: "date",
    tooltipField: "Date",
    headerClass: "ag-header-custom",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Dividend Amount",
    field: "dividendAmount",
    headerClass: "ag-header-custom",
    tooltipField: "Dividend Amount",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "High",
    field: "high",
    headerClass: "ag-header-custom",
    tooltipField: "High",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Low",
    field: "low",
    headerClass: "ag-header-custom",
    tooltipField: "Low",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Open",
    field: "open",
    headerClass: "ag-header-custom",
    tooltipField: "open",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "volume",
    field: "volume",
    headerClass: "ag-header-custom",
    tooltipField: "Volume",
    // width:
    flex: 1,
    sortable: false,
  },
];
export const CustomSelectOptions = [
  { value: "all", label: "All" },
  { value: "last3Months", label: "Last 3 Months" },
  { value: "last1Year", label: "Last 1 Year" },
  { value: "last2Year", label: "Last 2 Year" },
  { value: "last5Year", label: "Last 5 Year" },
];

export const convertToStockDataArray = (
  apiResponse: ApiResponse
): StockData[] => {
  const timeSeries = apiResponse["Monthly Adjusted Time Series"];
  const stockDataArray: StockData[] = [];

  for (const date in timeSeries) {
    const data = timeSeries[date];
    const stockData: StockData = {
      date,
      open: data["1. open"],
      high: data["2. high"],
      low: data["3. low"],
      close: data["4. close"],
      adjustedClose: data["5. adjusted close"],
      volume: data["6. volume"],
      dividendAmount: data["7. dividend amount"],
    };
    stockDataArray.push(stockData);
  }

  return stockDataArray;
};
export const generateChartData = (data: StockData[]): ChartData => {
  return {
    labels: data.map((data) => data?.date.toString()),
    datasets: [
      {
        label: "High",
        data: data.map((data) => data.high),
        backgroundColor: "green",
      },
      {
        label: "Low",
        data: data.map((data) => data.low),
        backgroundColor: "red",
      },
    ],
  };
};

interface FilteredData {
  filteredData: StockData[];
  maxHigh: number;
  maxLow: number;
  performance: number;
}
export interface CardsData {
  maxHigh: number;
  maxLow: number;
  performance: number;
}

const getLastNMonthsDate = (n: number): Date => {
  const currentDate = new Date();
  const result = new Date(currentDate);
  result.setMonth(result.getMonth() - n);
  return result;
};

const filterDataForNMonths = (n: number, data: StockData[]): StockData[] => {
  const endDate = new Date();
  const startDate = getLastNMonthsDate(n);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });

  if(filteredData.length!)
  filteredData.splice(-1, 1);

  return filteredData;
};


export const filterData = (
  selectedOption: CustomSelectProps["options"][0]["value"],
  data: StockData[]
): FilteredData => {
  let filteredData: StockData[] = [];
  let maxHigh: number = -Infinity;
  let maxLow: number = Infinity;

  if (selectedOption === "all") {
    filteredData = data;
  } else if (selectedOption === "last3Months") {
    filteredData = filterDataForNMonths(3, data);
  } else if (selectedOption === "last1Year") {
    filteredData = filterDataForNMonths(12, data);
  } else if (selectedOption === "last2Year") {
    filteredData = filterDataForNMonths(24, data);
  } else if (selectedOption === "last5Year") {
    filteredData = filterDataForNMonths(60, data);
  } else {
    filteredData = data;
  }

  filteredData.forEach((item) => {
    const high = parseFloat(item.high);
    const low = parseFloat(item.low);
    if (!isNaN(high) && high > maxHigh) {
      maxHigh = high;
    }
    if (!isNaN(low) && low < maxLow) {
      maxLow = low;
    }
  });

  const performance =
    maxHigh !== -Infinity && maxLow !== Infinity
      ? ((maxHigh - maxLow) / maxLow) * 100
      : 0;


  return { filteredData, maxHigh, maxLow, performance };
};
