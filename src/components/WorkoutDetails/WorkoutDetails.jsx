import { Link } from "react-router-dom";
import one from "../../assets/images/Workout/workout.png";
import { ArrowLeft } from "lucide-react";
export default function WorkoutDetails() {
  return (
    <div className="mx-auto p-6 bg-white w-full h-[90vh] overflow-y-scroll">
      <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
          <Link to={"/workout"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Push up</h1>

        </div>
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left side - Image */}
          <div className="relative bg-sidebar p-6 rounded-lg">
            <img
              src={one}
              alt="Smoothie bowl with berries and granola"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Right side - Nutrition and Recipe Facts */}
          <div className="space-y-6">
            {/* Nutrition Facts */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Workout type
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="text-2xl font-bold text-gray-800">Light</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">For body part</p>
                  <p className="text-2xl font-bold text-gray-800">Arms</p>
                </div>
              </div>
            </div>

            {/* Recipe Facts */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Workout fact
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Time needed</p>
                  <p className="text-2xl font-bold text-gray-800">10 min</p>
                </div>
                {/* <div>
                <p className="text-sm text-gray-600">Ratings</p>
                <p className="text-2xl font-bold text-gray-800">4.6</p>
              </div> */}
                <div>
                  <p className="text-sm text-gray-600">Calories burn</p>
                  <p className="text-lg font-semibold text-gray-800">100</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Equipment needed</p>
                  <p className="text-lg font-semibold text-gray-800">No</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full">
              High protein
            </span>
            <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full">
              Quick
            </span>
            <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full">
              Breakfast
            </span>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Benefits
            </h3>
            <ul className="space-y-2 text-gray-700">
            
              <li>• Improves upper body strength.</li>
              <li>• Contributes to core stability and strength.</li>
              <li>• May improve cardiovascular health.</li>
              <li>• Improves sports performance. </li>
              <li>• Works multiple muscles simultaneously. </li>
              <li>• May help support bone health.</li>
            </ul>
          </div>

        
        </div>
      </div>
    </div>
  );
}
