import React, { useState } from 'react';

const RecipeUploadForm = () => {
  const [formData, setFormData] = useState({
    recipeName: '',
    recipeType: '',
    forTime: 'Breakfast',
    tag: '',
    calories: '',
    carbs: '',
    protein: '',
    fat: '',
    makingTime: '',
    ratings: '',
    category: '',
    time: '',
    ingredients: '',
    instructions: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    console.log('Files uploaded:', files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Upload Recipe</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recipe Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Name
            </label>
            <input
              type="text"
              name="recipeName"
              placeholder="Type here"
              value={formData.recipeName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Recipe Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Type
            </label>
            <input
              type="text"
              name="recipeType"
              placeholder="Type here"
              value={formData.recipeType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* File Upload */}
          <div className="row-span-2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 h-32 flex flex-col justify-center items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                Drop your files here or{' '}
                <label className="text-blue-500 cursor-pointer hover:underline">
                  Click to upload
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".svg,.png,.jpg,.gif"
                    multiple
                  />
                </label>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              For time
            </label>
            <select
              name="forTime"
              value={formData.forTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              placeholder="Type here"
              value={formData.tag}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Nutrition Facts and Recipe Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nutrition Facts */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Nutrition Facts</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="calories"
                placeholder="Calories"
                value={formData.calories}
                onChange={handleInputChange}
                className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="carbs"
                placeholder="Carbs"
                value={formData.carbs}
                onChange={handleInputChange}
                className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="protein"
                placeholder="Protein"
                value={formData.protein}
                onChange={handleInputChange}
                className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="fat"
                placeholder="Fat"
                value={formData.fat}
                onChange={handleInputChange}
                className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Recipes fact */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Recipes fact</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="makingTime"
                placeholder="Making time"
                value={formData.makingTime}
                onChange={handleInputChange}
                className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="ratings"
                placeholder="Ratings"
                value={formData.ratings}
                onChange={handleInputChange}
                className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
                className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="time"
                placeholder="Time"
                value={formData.time}
                onChange={handleInputChange}
                className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              placeholder="Type here"
              value={formData.ingredients}
              onChange={handleInputChange}
              rows={8}
              className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions
            </label>
            <textarea
              name="instructions"
              placeholder="Type here"
              value={formData.instructions}
              onChange={handleInputChange}
              rows={8}
              className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeUploadForm;