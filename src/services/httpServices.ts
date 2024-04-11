import axios from "axios";
import { BASE_URL, STOCK_API_URL } from "./contants";
import { getAuthorizationConfig } from "./utils";

const token = localStorage.getItem("authToken");
export const GetData = async (symbolName: string) => {
  return axios.get(
    `${STOCK_API_URL}symbol=${symbolName}&interval=5min&apikey=62BS1RYKYSYVVRSM`
  );
};
export const getStocksDataBySymbol = async (
  symbolName: string,
  userId: string
) => {
  const config = getAuthorizationConfig(token as string);
  return axios.post(
    `${BASE_URL}/user/getStocksDataBySymbol`,
    {
      symbolName: symbolName,
      userId: userId,
    },
    config
  );
};
export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return axios.post(`${BASE_URL}/user/signup`, data);
};
export const login = async (data: { email: string; password: string }) => {
  return axios.post(`${BASE_URL}/user/login`, data);
};
export const userStocksData = async (userId: string, searchQuery: string) => {
  const config = getAuthorizationConfig(token as string);

  return axios.get(
    `${BASE_URL}/user/getStocksData?userId=${userId}&searchQuery=${searchQuery}`,
    config
  );
};

export const getStockDetail = async (userId: string, stockId: string) => {
  const config = getAuthorizationConfig(token as string);

  return axios.post(
    `${BASE_URL}/user/getStockDataById`,
    { userId, stockId },
    config
  );
};
export const deleteStockDetail = async (stockId: string) => {
  const config = getAuthorizationConfig(token as string);

  return axios.get(`${BASE_URL}/user/deleteStock?stockId=${stockId}`, config);
};
