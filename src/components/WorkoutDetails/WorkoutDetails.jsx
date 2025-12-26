import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useGetWorkoutQuery } from "../../Api/authApi";
import avatar from "../../assets/images/Workout/workout.png";

export default function WorkoutDetails() {
  const { id } = useParams();
  const { data: workout, isLoading } = useGetWorkoutQuery(id);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!workout) return <div className="p-8 text-center">Not found</div>;

  // Only use fields returned by API; guard absent fields
  const code = workout?.code ?? "-";
  const exerciseType = workout?.exercise_type ?? "-";
  const imageSrc = workout?.image || avatar;
  const videoSrc = workout?.video || null;

  return (
    <div className="mx-auto p-6 bg-white w-full h-[90vh] overflow-y-scroll">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to={"/workout"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            {workout.workout_name}
          </h1>
        </div>
        {/* Main content area: left column has image + video, right column shows exercise meta */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left - media column (span 2 on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <img
                src={imageSrc}
                alt={workout.workout_name || "Workout image"}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              {videoSrc ? (
                <a
                  href={videoSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="block relative"
                >
                  <div className="w-full h-56 md:h-72 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={imageSrc}
                      alt="video thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="w-full h-56 md:h-72 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  No video available
                </div>
              )}
            </div>
          </div>

          {/* Right - meta column */}
          <aside className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">
              Exercise
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm text-gray-500">Code</div>
              <div className="font-semibold text-gray-800">{code}</div>

              <div className="text-sm text-gray-500">Name</div>
              <div className="font-semibold text-gray-800">
                {workout.workout_name ?? "-"}
              </div>

              <div className="text-sm text-gray-500">Type</div>
              <div className="font-semibold text-gray-800">{exerciseType}</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
