"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetMonthlyRevenueStatsQuery } from "../../Api/dashboardApi";

export default function Revenue() {
  const [sortBy, setSortBy] = useState("yearly");

  // Fetch revenue data from API
  const { data: revenueStats, isLoading } = useGetMonthlyRevenueStatsQuery();

  // Transform revenue data for charts
  const transformRevenueData = () => {
    if (!revenueStats) return [];

    if (sortBy === "yearly") {
      // Transform yearly data - combine this year and last year
      return revenueStats.this_year.map((item, index) => {
        const lastYearItem = revenueStats.last_year[index] || {
          total_revenue: 0,
        };
        const monthName = item.month.split("-")[0]; // Extract month name
        return {
          month: monthName,
          thisYear: item.total_revenue,
          lastYear: lastYearItem.total_revenue,
          revenue: item.total_revenue, // For area chart
        };
      });
    } else {
      // Transform monthly (daily) data
      return revenueStats.current_month.map((item) => {
        const day = Number.parseInt(item.day.split("-")[0]); // Extract day number
        return {
          day: day,
          revenue: item.daily_revenue,
          value: day,
        };
      });
    }
  };

  const revenueData = transformRevenueData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg text-sm">
          {sortBy === "yearly"
            ? `${label}: $${data.value}`
            : `Day ${label}: $${data.value}`}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="mx-auto">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-500">Loading revenue data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        {/* Chart Header */}
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-lg font-semibold text-gray-900">Revenue</h2>
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

        {/* Revenue Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="0"
                stroke="#F3F4F6"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey={sortBy === "yearly" ? "month" : "day"}
                axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                tickFormatter={(value) =>
                  sortBy === "yearly" ? value : `${value}`
                }
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="none"
                fill="#E5E7EB"
                fillOpacity={1}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6B7280"
                strokeWidth={1}
                dot={{
                  r: 3,
                  fill: "#374151",
                  stroke: "#374151",
                  strokeWidth: 1,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
