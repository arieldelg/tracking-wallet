import axios from "axios";
import { getEnvirables } from "../helpers";

const { VITE_API_URL } = getEnvirables();

const walletAPI = axios.create({
  baseURL: VITE_API_URL,
});

export { walletAPI };
