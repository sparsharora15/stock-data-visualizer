export interface MonthlyAdjustedData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. adjusted close": string;
  "6. volume": string;
  "7. dividend amount": string;
}

export interface MonthlyAdjustedTimeSeries {
  [date: string]: MonthlyAdjustedData;
}

export interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Time Zone": string;
}

export interface ApiResponse {
  "Meta Data": MetaData;
  "Monthly Adjusted Time Series": MonthlyAdjustedTimeSeries;
}
export interface CustomSelectProps {
  options: {
    label: string;
    value: string;
  }[];
}
export interface FilteredData {
  filteredData: StockData[];
  maxHigh: number;
  maxLow: number;
  performance: number;
}
export interface StockData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  adjustedClose: string;
  volume: string;
  dividendAmount: string;
}
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: string[];
    backgroundColor: string;
  }[];
}
export interface filteredData {
  adjustedClose: string | number;
  close: string | number;
  date: string;
  dividendAmount: string | number;
  high: string | number;
  low: string | number;
  open: string | number;
  volume: string | number;
}
export interface PageProps {
  Components: JSX.Element;
}
export interface StocksRowData {
  _id: string;
  symbol: string;
  maxHigh: number | string;
  maxLow: number | string;
  performance: number | string;
}
