import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
const Overview = () => {
  const chartData = [
    { month: "Jan", thisYear: 15000, lastYear: 12000 },
    { month: "Feb", thisYear: 8000, lastYear: 10000 },
    { month: "Mar", thisYear: 12000, lastYear: 15000 },
    { month: "Apr", thisYear: 25000, lastYear: 16000 },
    { month: "May", thisYear: 28000, lastYear: 18000 },
    { month: "Jun", thisYear: 22000, lastYear: 25000 },
    { month: "Jul", thisYear: 25000, lastYear: 20000 },
  ];
  const metrics = [
    {
      title: "Total Clients",
      value: "726",
      change: "+6",
      changeType: "positive",
    },
    {
      title: "AVG Progress",
      value: "67.90%",
      change: "+2.6%",
      changeType: "positive",
    },
    {
      title: "Total Revenue",
      value: "$56k",
      change: "+1k",
      changeType: "positive",
    },
    {
      title: "At Risk",
      value: "3",
      change: "-1",
      changeType: "negative",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

              <div className={`text-sm font-medium text-neutral/60`}>
                {metric.change} from last month
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
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
              <select className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="yearly">yearly</option>
                <option value="monthly">monthly</option>
                <option value="weekly">weekly</option>
              </select>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis
                  dataKey="month"
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
                  strokeWidth={3}
                  dot={false}
                  fill="#F3F4F6"
                  fillOpacity={0.1}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
