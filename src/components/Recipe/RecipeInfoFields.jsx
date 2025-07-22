import React from "react";

const RecipeInfoFields = ({ formData, handleInputChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label
        htmlFor="recipeName"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Recipe Name
      </label>
      <input
        id="recipeName"
        type="text"
        name="recipeName"
        placeholder="Type here"
        value={formData.recipeName}
        onChange={handleInputChange}
        className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label
        htmlFor="recipeType"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Recipe Type
      </label>
      <input
        id="recipeType"
        type="text"
        name="recipeType"
        placeholder="Type here"
        value={formData.recipeType}
        onChange={handleInputChange}
        className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label
        htmlFor="forTime"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        For time
      </label>
      <select
        id="forTime"
        name="forTime"
        value={formData.forTime}
        onChange={handleInputChange}
        className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 appearance-none pr-10"
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
    </div>
  </div>
);

export default RecipeInfoFields;
