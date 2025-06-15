import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function WeightTrends() {
  const weightData = [
    { week: "W1", weight: 80 },
    { week: "W2", weight: 78 },
    { week: "W3", weight: 76 },
    { week: "W4", weight: 74 },
    { week: "W5", weight: 72 },
    { week: "W6", weight: 70 },
    { week: "W7", weight: 68 },
  ];
  return (
    <div className="border border-outline rounded-xl p-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Weight Trends</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weightData}>
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              domain={[0, 80]}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#7C3AED"
              strokeWidth={2}
              dot={{ r: 4, fill: "#7C3AED" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
