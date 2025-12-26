import React, { useState } from "react";

export default function UserStats({ userStats, userDetails }) {
  const [showRaw, setShowRaw] = useState(false);
  if (!userStats) {
    return (
      <div className="bg-sidebar rounded-xl p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No user statistics available</p>
        </div>
        <div className="mt-2">
          <button
            onClick={() => setShowRaw((s) => !s)}
            className="text-sm text-primary underline"
          >
            {showRaw ? "Hide raw data" : "Show raw data"}
          </button>
        </div>
      </div>
    );
  }

  // build friendly local variables
  const profile = userStats?.profile || {};
  const meal = userStats?.complete_meal_data || {};
  const workout = userStats?.complete_workout_plan_data || {};

  const mealProgress = Number(meal.completed_progress_percentage ?? 0);
  const workoutProgress = Number(workout.completed_progress_percentage ?? 0);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          {userDetails?.fullname || "User Stats"}
        </h2>
        <p className="text-gray-600 text-sm">
          Last visit:{" "}
          {userDetails?.subscription_details?.start_date
            ? new Date(
                userDetails.subscription_details.start_date
              ).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg p-6 bg-purple-50 text-center">
          <p className="text-sm text-gray-600">Current Weight</p>
          <p className="text-2xl font-extrabold text-purple-700">
            {profile.weight ?? "N/A"} kg
          </p>
        </div>

        <div className="rounded-lg p-6 bg-indigo-50 text-center">
          <p className="text-sm text-gray-600">Height</p>
          <p className="text-2xl font-extrabold text-indigo-700">
            {profile.height ?? "N/A"} cm
          </p>
        </div>

        <div className="rounded-lg p-6 bg-green-50 text-center">
          <p className="text-sm text-gray-600">Gender</p>
          <p className="text-2xl font-extrabold text-green-700">
            {profile.gender ?? "N/A"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: 15 days meal data */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Your 15 days meal data
          </h3>

          <div className="mb-3 flex items-center justify-between">
            <div className="w-3/4 bg-white rounded-full h-2 overflow-hidden mr-4">
              <div
                className="h-2 bg-purple-600"
                style={{ width: `${mealProgress}%` }}
              />
            </div>
            <div className="text-sm text-gray-600">
              {meal.total_completed_days ?? 0}/
              {(meal.total_uncompleted_days ?? 0) +
                (meal.total_completed_days ?? 0)}
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            ID: {meal.meal_plan_id ?? "-"}
          </div>
          <div className="text-xs text-gray-500 mb-4">
            Start & End: {meal.start_date ?? "-"} to {meal.end_date ?? "-"}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-white rounded text-center">
              <div className="text-sm text-gray-500">Completed Meal</div>
              <div className="font-bold text-lg">
                {meal.total_completed_meal ?? 0}
              </div>
            </div>
            <div className="p-4 bg-white rounded text-center">
              <div className="text-sm text-gray-500">Uncompleted Meal</div>
              <div className="font-bold text-lg">
                {meal.total_uncompleted_meal ?? 0}
              </div>
            </div>

            <div className="p-4 bg-white rounded text-center">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="font-bold text-lg">{mealProgress}%</div>
            </div>
            <div className="p-4 bg-white rounded text-center">
              <div className="text-sm text-gray-500">Total Calories</div>
              <div className="font-bold text-lg">
                {meal.total_calories ?? 0}
              </div>
            </div>

            <div className="p-4 bg-white rounded text-center">
              <div className="text-sm text-gray-500">Total Protein</div>
              <div className="font-bold text-lg">{meal.total_protein ?? 0}</div>
            </div>
            <div className="p-4 bg-white rounded text-center">
              <div className="text-sm text-gray-500">Total Fat</div>
              <div className="font-bold text-lg">{meal.total_fat ?? 0}</div>
            </div>

            <div className="col-span-2 p-4 bg-white rounded text-center">
              <div className="text-sm text-gray-500">Total Carbs</div>
              <div className="font-bold text-lg">{meal.total_carbs ?? 0}</div>
            </div>
          </div>
        </div>

        {/* Right: 7 days workout data */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Your 7 days workout data
          </h3>

          <div className="mb-3 flex items-center justify-between">
            <div className="w-3/4 bg-white rounded-full h-2 overflow-hidden mr-4">
              <div
                className="h-2 bg-purple-600"
                style={{ width: `${workoutProgress}%` }}
              />
            </div>
            <div className="text-sm text-gray-600">
              {workout.total_completed_days ?? 0}/
              {(workout.total_uncompleted_days ?? 0) +
                (workout.total_completed_days ?? 0)}
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            ID: {workout.workout_plan_id ?? "-"}
          </div>
          <div className="text-xs text-gray-500 mb-4">
            Start & End: {workout.start_date ?? "-"} to{" "}
            {workout.end_date ?? "-"}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-white rounded text-center">
              <div className="text-sm text-gray-500">Completed Workout</div>
              <div className="font-bold text-lg">
                {workout.total_completed_workout ?? 0}
              </div>
            </div>
            <div className="p-4 bg-white rounded text-center">
              <div className="text-sm text-gray-500">Uncompleted Workout</div>
              <div className="font-bold text-lg">
                {workout.total_uncompleted_workout ?? 0}
              </div>
            </div>

            <div className="p-4 bg-white rounded text-center">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="font-bold text-lg">{workoutProgress}%</div>
            </div>

            <div className="col-span-2 text-sm text-gray-500 mt-2">
              Completed Days: {workout.total_completed_days ?? 0} /{" "}
              {workout.total_uncompleted_days ?? 0}
            </div>
          </div>
        </div>
      </div>

      {/* Optional raw JSON for debugging */}
      {showRaw && (
        <div className="mt-4 p-4 bg-gray-900 text-white rounded overflow-auto max-h-96">
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify({ userDetails, userStats }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
