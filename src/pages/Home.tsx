import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";

const Home: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
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
    const interval = setInterval(fetchAssetData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-auto p-8">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
              Crypto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Market Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              24h Change
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={asset.image}
                    alt={`${asset.name} icon`}
                    className="w-6 h-6 mr-2"
                  />
                  <span>{`${asset.symbol.toUpperCase()}`}</span>
                  <span className="text-gray-400 text-xs ml-1">/USDT</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm">{`${asset.current_price}`}</span>
                <span className="text-gray-400 text-xs ml-1">/USDT</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm">{`${asset.market_cap.toLocaleString()}`}</span>
                <span className="text-gray-400 text-xs ml-1">/USDT</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                {asset.price_change_percentage_24h > 0 ? (
                  <span className="text-green-500 mr-1">
                    <GoArrowUpRight />
                  </span>
                ) : (
                  <span className="text-red-500 mr-1">
                    <GoArrowDownRight />
                  </span>
                )}
                <span
                  className={`${
                    asset.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : asset.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-black"
                  } text-sm`}
                >
                  {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                </span>
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap ${
                  asset.priceChangePercent > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                ++
                {/* Implement sparkline chart */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
