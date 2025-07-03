import { ArrowLeft } from "lucide-react";
import one from "../../assets/images/recipe/recipe1.webp";
import { Link } from "react-router-dom";
export default function RecipeDetails() {
  return (
    <div className="mx-auto p-6 bg-white w-full h-[90vh] overflow-y-scroll">
       <div className="flex items-center mb-8">
          <Link to={"/recipe"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
             Recipe Details
          </h1>
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
              Nutrition Facts
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Calories</p>
                <p className="text-2xl font-bold text-gray-800">340</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Carbs</p>
                <p className="text-2xl font-bold text-gray-800">30g</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Protein</p>
                <p className="text-2xl font-bold text-gray-800">280g</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fat</p>
                <p className="text-2xl font-bold text-gray-800">10g</p>
              </div>
            </div>
          </div>

          {/* Recipe Facts */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recipe fact
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Making time</p>
                <p className="text-2xl font-bold text-gray-800">10 min</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ratings</p>
                <p className="text-2xl font-bold text-gray-800">4.6</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-lg font-semibold text-gray-800">
                  Cheat meal
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-lg font-semibold text-gray-800">Lunch</p>
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
            Ingredients
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 1 cup oat flour</li>
            <li>• 2 scoops vanilla protein powder</li>
            <li>• 2 eggs</li>
            <li>• 1 cup almond milk</li>
            <li>• 1 tsp baking powder</li>
            <li>• 1 tbsp honey</li>
            <li>• 1/2 tsp vanilla extract</li>
            <li>• Pinch of salt</li>
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Instructions
          </h3>
          <ol className="space-y-2 text-gray-700">
            <li>1. Mix dry ingredients in a large bowl</li>
            <li>2. Whisk wet ingredients in separate bowl</li>
            <li>3. Combine wet and dry ingredients</li>
            <li>4. Heat non-stick pan over medium heat</li>
            <li>5. Pour 1/4 cup batter per pancake</li>
            <li>6. Cook 2-3 minutes until bubbles form</li>
            <li>7. Flip and cook 1-2 minutes more</li>
            <li>8. Serve with fresh berries and syrup</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
