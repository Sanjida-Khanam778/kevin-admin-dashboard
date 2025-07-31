import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  useGetDashboardStatsQuery,
  useGetUserMonthlyStatsQuery,
} from "../../Api/dashboardApi";
import Revenue from "../Charts/Revenue";

const Overview = () => {
  const [sortBy, setSortBy] = useState("yearly");

  // Fetch data from APIs
  const { data: dashboardStats, isLoading: dashboardLoading } =
    useGetDashboardStatsQuery();
  const { data: userStats, isLoading: userStatsLoading } =
    useGetUserMonthlyStatsQuery();

  // Transform user stats data for charts
  const transformUserData = () => {
    if (!userStats) return [];

    if (sortBy === "yearly") {
      // Create 12 months of data
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Create a map of existing data from API
      const thisYearData = {};
      const lastYearData = {};

      userStats.this_year?.forEach((item) => {
        const monthName = item.month.split("-")[0];
        thisYearData[monthName] = item.total_users;
      });

      userStats.last_year?.forEach((item) => {
        const monthName = item.month.split("-")[0];
        lastYearData[monthName] = item.total_users;
      });

      // Generate 12 months of data
      return months.map((month) => ({
        month: month,
        thisYear: thisYearData[month] || 0,
        lastYear: lastYearData[month] || 0,
      }));
    } else {
      // Transform monthly (daily) data
      return userStats.current_month.map((item, index) => {
        const day = item.day.split("-")[0]; // Extract day
        return {
          Day: Number.parseInt(day),
          thisYear: item.new_users,
          lastYear: 0, // No last year daily data available
        };
      });
    }
  };

  const chartData = transformUserData();

  // Loading state
  if (dashboardLoading || userStatsLoading) {
    return (
      <div className="p-6 h-[90vh] overflow-y-scroll">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Users",
      value: dashboardStats?.stats?.total_users || 0,
    },
    {
      title: "Total Revenue",
      value: `$${dashboardStats?.stats?.total_revenue || 0}`,
    },
    {
      title: "Active Subscriptions",
      value: dashboardStats?.stats?.total_active_subscriptions || 0,
    },
  ];

  return (
    <div className="p-6 h-[90vh] overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto bg-white">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-gray-600 tracking-wide">
                {metric.title}
              </h3>
              <div className="text-3xl font-bold text-gray-900">
                {metric.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-white rounded-xl p-6 mb-10 shadow-sm border border-gray-200">
          {/* Chart Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {sortBy === "yearly" ? "Total Users" : "New Users"}
              </h2>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                  <span className="text-sm font-medium text-gray-700">
                    This year
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
                data={chartData}
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
                  tickFormatter={(value) => `${value}`}
                />
                {sortBy === "yearly" && (
                  <Line
                    type="monotone"
                    dataKey="lastYear"
                    stroke="#D1D5DB"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                )}
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

        {/* Revenue Component */}
        <Revenue />
      </div>
    </div>
  );
};

export default Overview;
