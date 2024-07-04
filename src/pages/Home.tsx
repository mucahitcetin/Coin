import React, { useEffect, useState } from "react";
import axios from "axios";
import millify from "millify";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { Sparklines, SparklinesLine } from "react-sparklines";

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
    const interval = setInterval(fetchAssetData, 100000);

    return () => clearInterval(interval);
  }, []);

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              24h Chart
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <img
                      src={asset.image}
                      alt={`${asset.name} icon`}
                      className="w-10 h-10 mr-2 text-lg"
                    />
                    <div className="flex-col">
                      <span className="text-lg font-semibold">
                        {`${asset.symbol.toUpperCase()}`}
                      </span>
                      <span className="text-gray-400 text-lg ml-1">/ USDT</span>
                      <div className="text-gray-500 text-lg mt-1">
                        {`${capitalize(asset.id)}`}
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-lg font-semibold">{`${asset.current_price}`}</span>
                <span className="text-gray-400 text-xs ml-1"> USDT</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-lg font-semibold">
                  {millify(asset.market_cap)}
                </span>
                <span className="text-gray-400  text-xs ml-1"> USDT</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center font-semibold">
                  {asset.price_change_percentage_24h > 0 ? (
                    <span
                      className="text-green-500 mr-1"
                      style={{ fontSize: "1.5em" }}
                    >
                      <GoArrowUpRight />
                    </span>
                  ) : (
                    <span
                      className="text-red-500 mr-1"
                      style={{ fontSize: "1.5em" }}
                    >
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
                    } text-lg`}
                  >
                    {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Sparklines
                  data={[asset.low_24h, asset.high_24h, asset.current_price]}
                  width={100}
                  height={30}
                  margin={5}
                >
                  <SparklinesLine
                    color={
                      asset.price_change_percentage_24h > 0 ? "green" : "red"
                    }
                  />
                </Sparklines>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
