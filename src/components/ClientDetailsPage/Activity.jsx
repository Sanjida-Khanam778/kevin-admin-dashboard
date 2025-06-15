import React from "react";

export default function Activity() {
  const activityData = [
    { label: "Meal logs", value: "60/66" },
    { label: "Workout logs", value: "12/20" },
    { label: "Check In", value: "4/4" },
  ];

  const ProgressBar = ({ percentage, color = "bg-gray-800" }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
  return (
    <div className="border border-outline rounded-xl p-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        15 Days Activity
      </h3>
      <div className="space-y-4">
        {activityData?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{item.label}</span>
            <div className="flex items-center space-x-3">
              <div className="w-48">
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
  );
}
