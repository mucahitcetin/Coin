import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoTable from "../components/CryptoTable";
import Pagination from "../components/Pagination";

interface Asset {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  low_24h: number;
  high_24h: number;
}

const Home: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
            },
          }
        );
        console.log(response.data);
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssetData();
    const interval = setInterval(fetchAssetData, 100000);

    return () => clearInterval(interval);
  }, []);

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  const currentPageData = assets.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(assets.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="overflow-x-auto p-8">
      <CryptoTable assets={currentPageData} />
      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
    </div>
  );
};

export default Home;
