import WeightTrends from "./WeightTrends";
import BodyComposition from "./BodyComposition";
import AppEngagement from "./AppEngagement";
import Activity from "./Activity";
export default function UserStats() {
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
        <WeightTrends />

        {/* Body Composition */}
        <BodyComposition />

        {/* 15 Days Activity */}
        <div className="col-span-2">
          <Activity />
        </div>
      </div>
    </div>
  );
}
