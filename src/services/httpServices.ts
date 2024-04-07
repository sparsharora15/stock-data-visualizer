import axios from "axios";
import BASE_URL from "./BASE_URL";
const GetData = async (symbolName :string) => {
  return axios.get(`${BASE_URL}symbol=${symbolName}&interval=5min&apikey=62BS1RYKYSYVVRSM`);
};
export default GetData