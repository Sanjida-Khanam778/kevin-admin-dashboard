import {
  Area,
  AreaChart,
  Dot,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Revenue() {
  const revenueData = [
    { value: 5, revenue: 20, highlighted: false },
    { value: 10, revenue: 50, highlighted: true },
    { value: 12, revenue: 30, highlighted: false },
    { value: 15, revenue: 50, highlighted: true },
    { value: 18, revenue: 30, highlighted: false },
    { value: 20, revenue: 50, highlighted: true },
    { value: 21, revenue: 90, highlighted: true, tooltip: "64,364.77" },
    { value: 25, revenue: 50, highlighted: true },
    { value: 30, revenue: 50, highlighted: true },
    { value: 35, revenue: 60, highlighted: true },
    { value: 37, revenue: 25, highlighted: false },
    { value: 40, revenue: 25, highlighted: false },
    { value: 42, revenue: 70, highlighted: true },
    { value: 45, revenue: 60, highlighted: false },
    { value: 47, revenue: 65, highlighted: true },
    { value: 50, revenue: 60, highlighted: false },
    { value: 52, revenue: 55, highlighted: true },
    { value: 55, revenue: 40, highlighted: false },
    { value: 57, revenue: 55, highlighted: true },
    { value: 60, revenue: 55, highlighted: true },
  ];
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (data.tooltip) {
        return (
          <div className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg text-sm">
            {data.tooltip}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {/* Chart Header */}
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-lg font-semibold text-gray-900">Revenue</h2>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by</span>
            <select className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="yearly">yearly</option>
              <option value="monthly">monthly</option>
              <option value="weekly">weekly</option>
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
              <XAxis
                dataKey="value"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                tickFormatter={(value) => `${value}k`}
                domain={[0, 60]}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
                ticks={[20, 40, 60, 80, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="none"
                fill="#E5E7EB"
                fillOpacity={0.6}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6B7280"
                strokeWidth={1}
                dot={({ cx, cy, payload }) => {
                  if (payload.highlighted) {
                    return (
                      <Dot
                        cx={cx}
                        cy={cy}
                        r={3}
                        fill="#374151"
                        stroke="#374151"
                        strokeWidth={1}
                      />
                    );
                  }
                  return null;
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
