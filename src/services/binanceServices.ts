import axios from "axios";

const BINANCE_API_URL = "https://api.binance.com/api/v3";

export async function fetchAssets(): Promise<any> {
  try {
    const response = await axios.get(`${BINANCE_API_URL}/ticker/24hr`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Binance assets:", error);
    throw error;
  }
}
