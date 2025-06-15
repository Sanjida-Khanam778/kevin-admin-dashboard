import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
export default function UserStats() {
  const weightData = [
    { week: "W1", weight: 80 },
    { week: "W2", weight: 78 },
    { week: "W3", weight: 76 },
    { week: "W4", weight: 74 },
    { week: "W5", weight: 72 },
    { week: "W6", weight: 70 },
    { week: "W7", weight: 68 },
  ];

  const engagementData = [
    { name: "Completed", value: 65, color: "#1E40AF" },
    { name: "In Progress", value: 25, color: "#7C3AED" },
    { name: "Not Started", value: 10, color: "#059669" },
  ];

  const bodyComposition = [
    { label: "Body Fat", percentage: 45 },
    { label: "Skeletal mass", percentage: 65 },
    { label: "Water", percentage: 55 },
    { label: "BMC", percentage: 85 },
  ];

  const activityData = [
    { label: "Meal logs", value: "60/66" },
    { label: "Workout logs", value: "12/20" },
    { label: "Check In", value: "4/4" },
  ];

  const ProgressBar = ({ percentage, color = "bg-gray-800" }) => (
    <div className="w-full rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
  return (
    <div className="bg-sidebar rounded-xl p-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Maria González</h2>
        <p className="text-gray-600 text-sm">Last visit: 2024-01-15</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-100 rounded-xl p-6">
          <p className="text-gray-600 text-sm mb-2">Current Weight</p>
          <p className="text-3xl font-bold text-gray-900">75 kg</p>
        </div>
        <div className="bg-blue-100 rounded-xl p-6">
          <p className="text-gray-600 text-sm mb-2">Target Weight</p>
          <p className="text-3xl font-bold text-gray-900">70 kg</p>
        </div>
        <div className="bg-green-100 rounded-xl p-6">
          <p className="text-gray-600 text-sm mb-2">Progress</p>
          <p className="text-3xl font-bold text-gray-900">82%</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Weight Trends */}
        <div className="border border-outline rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Weight Trends
          </h3>
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

        {/* Body Composition */}
        <div className="border border-outline rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Body Composition
          </h3>
          <div className="space-y-4">
            {bodyComposition.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-24">{item.label}</span>
                <div className="flex-1 mx-3">
                  <ProgressBar percentage={item.percentage} />
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* App Engagement */}
        <div className="border border-outline rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            App Engagement
          </h3>
          <div className="h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 15 Days Activity */}
        <div className="border border-outline rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            15 Days Activity
          </h3>
          <div className="space-y-4">
            {activityData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32">
                    <ProgressBar
                      percentage={
                        item.value === "60/66"
                          ? 91
                          : item.value === "12/20"
                          ? 60
                          : item.value === "4/4"
                          ? 100
                          : 0
                      }
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
