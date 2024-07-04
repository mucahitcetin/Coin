import React from "react";
import millify from "millify";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { Sparklines, SparklinesLine } from "react-sparklines";

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

interface CryptoTableProps {
  assets: Asset[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ assets }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
              Crypto
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Market Value
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              24h Change
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              24h Chart
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={asset.image}
                    alt={`${asset.name} icon`}
                    className="w-8 h-8 md:w-10 md:h-10 mr-2"
                  />
                  <div className="flex-col">
                    <span className="text-sm md:text-lg font-semibold">
                      {asset.symbol.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-sm md:text-lg ml-1">
                      / USDT
                    </span>
                    <div className="text-gray-500 text-sm md:text-lg mt-1">
                      {asset.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap">
                <span className="text-sm md:text-lg font-semibold">
                  {asset.current_price}
                </span>
                <span className="text-gray-400 text-xs ml-1"> USDT</span>
              </td>
              <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap">
                <span className="text-sm md:text-lg font-semibold">
                  {millify(asset.market_cap)}
                </span>
                <span className="text-gray-400 text-xs ml-1"> USDT</span>
              </td>
              <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap">
                <div className="flex items-center font-semibold">
                  {asset.price_change_percentage_24h > 0 ? (
                    <span className="text-green-500 mr-1 text-lg">
                      <GoArrowUpRight />
                    </span>
                  ) : (
                    <span className="text-red-500 mr-1 text-lg">
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
                    } text-sm md:text-lg`}
                  >
                    {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap">
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

export default CryptoTable;
