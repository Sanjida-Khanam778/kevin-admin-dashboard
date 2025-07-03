import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import Revenue from "../Charts/Revenue";

const Overview = () => {
  const [sortBy, setSortBy] = useState("yearly");
  console.log(sortBy);

  const chartData = [
    { month: "Jan", thisYear: 15000, lastYear: 12000 },
    { month: "Feb", thisYear: 8000, lastYear: 10000 },
    { month: "Mar", thisYear: 12000, lastYear: 15000 },
    { month: "Apr", thisYear: 25000, lastYear: 16000 },
    { month: "May", thisYear: 28000, lastYear: 18000 },
    { month: "Jun", thisYear: 22000, lastYear: 25000 },
    { month: "Jul", thisYear: 25000, lastYear: 20000 },
    { month: "Aug", thisYear: 15000, lastYear: 12000 },
    { month: "Sep", thisYear: 8000, lastYear: 10000 },
    { month: "Oct", thisYear: 12000, lastYear: 15000 },
    { month: "Nov", thisYear: 25000, lastYear: 16000 },
    { month: "Dec", thisYear: 28000, lastYear: 18000 },
  ];
  const monthData = [
    { Day: 1, thisYear: 15000, lastYear: 12000 },
    { Day: 2, thisYear: 8000, lastYear: 10000 },
    { Day: 3, thisYear: 12000, lastYear: 15000 },
    { Day: 4, thisYear: 25000, lastYear: 16000 },
    { Day: 5, thisYear: 28000, lastYear: 18000 },
    { Day: 6, thisYear: 22000, lastYear: 25000 },
    { Day: 7, thisYear: 25000, lastYear: 20000 },
    { Day: 8, thisYear: 15000, lastYear: 12000 },
    { Day: 9, thisYear: 8000, lastYear: 10000 },
    { Day: 10, thisYear: 12000, lastYear: 15000 },
    { Day: 11, thisYear: 25000, lastYear: 16000 },
    { Day: 12, thisYear: 28000, lastYear: 18000 },
    { Day: 13, thisYear: 12000, lastYear: 15000 },
    { Day: 14, thisYear: 25000, lastYear: 16000 },
    { Day: 15, thisYear: 28000, lastYear: 18000 },
    { Day: 16, thisYear: 22000, lastYear: 25000 },
    { Day: 17, thisYear: 25000, lastYear: 20000 },
    { Day: 18, thisYear: 15000, lastYear: 12000 },
    { Day: 19, thisYear: 8000, lastYear: 10000 },
    { Day: 20, thisYear: 12000, lastYear: 15000 },
    { Day: 21, thisYear: 25000, lastYear: 16000 },
    { Day: 22, thisYear: 28000, lastYear: 18000 },
    { Day: 23, thisYear: 12000, lastYear: 15000 },
    { Day: 24, thisYear: 25000, lastYear: 16000 },
    { Day: 25, thisYear: 28000, lastYear: 18000 },
    { Day: 26, thisYear: 22000, lastYear: 25000 },
    { Day: 27, thisYear: 25000, lastYear: 20000 },
    { Day: 28, thisYear: 15000, lastYear: 12000 },
    { Day: 29, thisYear: 8000, lastYear: 10000 },
    { Day: 30, thisYear: 12000, lastYear: 15000 },
  ];
  const metrics = [
    {
      title: "Total Clients",
      value: "726",
    },
  
    {
      title: "Total Revenue",
      value: "$56k",
    },
    {
      title: "Total Subscribers",
      value: "726",
    },
  ];

  return (
    <div className="p-6 h-[90vh] overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto bg-white">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-sm border border-outline hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-neutral/80 tracking-wide">
                {metric.title}
              </h3>

              <div className="text-3xl font-bold text-dark">{metric.value}</div>

             
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-background rounded-xl p-6 mb-10">
          {/* Chart Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Total Users
              </h2>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                  <span className="text-sm font-medium text-gray-700">
                    This year
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Last year
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="yearly">yearly</option>
                <option value="monthly">monthly</option>
              </select>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sortBy === "yearly" ? chartData : monthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis
                  dataKey={sortBy === "yearly" ? "month" : "Day"}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  tickFormatter={(value) => `${value / 1000}K`}
                  domain={[0, 30000]}
                  ticks={[0, 10000, 20000, 30000]}
                />
                <Line
                  type="monotone"
                  dataKey="lastYear"
                  stroke="#D1D5DB"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="thisYear"
                  stroke="#1F2937"
                  strokeWidth={1.5}
                  dot={false}
                  fill="#F3F4F6"
                  fillOpacity={0.1}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
          {/* revenue */}
          <Revenue />
      </div>
    </div>
  );
};

export default Overview;
