import { ArrowLeft } from "lucide-react";
import one from "../../assets/images/recipe/recipe1.webp";
import { Link, useParams } from "react-router-dom";
import { useGetRecipeQuery } from "../../Api/authApi";

export default function RecipeDetails() {
  const params = useParams();
  const { data, isLoading: isFetching } = useGetRecipeQuery(params.id);
  const { id, food_name, category, image } = data || {};

  if (isFetching)
    return (
      <div className="mx-auto p-6 bg-white w-full h-[90vh] flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="mx-auto p-6 bg-white w-full h-[90vh] overflow-y-scroll">
      <div className="flex items-center mb-8">
        <Link to={"/recipe"}>
          <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">{food_name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="relative bg-sidebar p-6 rounded-lg h-[500px]">
          <img
            src={image || one}
            alt={food_name || "Recipe image"}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Details
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-600">ID</p>
                <p className="text-lg font-semibold text-gray-800">{id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-lg font-semibold text-gray-800">
                  {category}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
