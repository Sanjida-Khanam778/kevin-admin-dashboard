import React, { useState } from "react";
import FileUpload from "../Shared/FileUpload";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import toast from "react-hot-toast";
import { useCreateRecipeMutation } from "../../Api/authApi";
import { CgSpinner } from "react-icons/cg";

const RecipeUploadForm = () => {
  const [formData, setFormData] = useState({
    recipeName: "",
    recipeType: "",
    forTime: "Breakfast",
    tag: "",
    calories: "",
    carbs: "",
    protein: "",
    fat: "",
    makingTime: "",
    ratings: "",
    category: "",
    time: "",
    ingredients: "",
    instructions: "",
  });
  const [tags, setTags] = useState([]);
  // const [resetFileUpload, setResetFileUpload] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [createRecipe, { isLoading, error, isSuccess }] =
    useCreateRecipeMutation();
console.log(isLoading)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const KeyCodes = {
    comma: 188,
    enter: [10, 13],
  };

  const handleDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onTagUpdate = (index, newTag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);
  };

  const handleAddition = (tag) => {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      console.log("Image file set:", file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      console.log("Image file set:", file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Image file at submit:", imageFile);
      const form = new FormData();
      form.append("recipe_name", formData.recipeName);
      form.append("recipe_type", formData.recipeType);
      form.append("for_time", formData.forTime);
      form.append("tag", tags.map((t) => t.text).join(","));
      form.append("calories", formData.calories);
      form.append("carbs", formData.carbs);
      form.append("protein", formData.protein);
      form.append("fat", formData.fat);
      form.append("making_time", formData.makingTime);
      // form.append('ratings', formData.ratings); // commented as per your change
      form.append("category", formData.category);
      form.append("time", formData.time);
      form.append("ingredients", formData.ingredients);
      form.append("instructions", formData.instructions);
      if (imageFile) {
        form.append("image", imageFile);
        console.log("Appended image to FormData:", imageFile);
      } else {
        console.log("No image file to append");
      }
      // Log FormData content
      for (let pair of form.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }
      // Log fetch call details
      console.log("Calling createRecipe with FormData:", form);
      await createRecipe(form).unwrap();
      toast.success("Recipe uploaded successfully!");
      // Reset all form fields
      setFormData({
        recipeName: "",
        recipeType: "",
        forTime: "",
        tag: "",
        calories: "",
        carbs: "",
        protein: "",
        fat: "",
        makingTime: "",
        ratings: "",
        category: "",
        time: "",
        ingredients: "",
        instructions: "",
      });
      setTags([]);
      setImageFile(null);
      setImagePreview(null)
      // setResetFileUpload(true);
    
    } catch (err) {
      toast.error("Failed to upload recipe");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white h-[90vh] overflow-y-scroll w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to={"/recipe"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            Upload Recipe
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {/* For time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  For time
                </label>
                <div className="relative">
                  <select
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tag */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag
                </label>
                <div className="w-full px-3 py-1 bg-gray-100 border-0 rounded-md focus-within:outline-none ">
                  <ReactTags
                    tags={tags}
                    separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleTagClick={handleTagClick}
                    onTagUpdate={onTagUpdate}
                    inputFieldPosition="bottom"
                    editable
                    dragDrop={false}
                    maxTags={4}
                    placeholder="Type here and press Enter..."
                    classNames={{
                      tags: "flex flex-wrap gap-3 mb-2",
                      tagInput: "flex-1",
                      tagInputField:
                        "w-full px-2 py-1 bg-gray-100 border-none outline-none text-sm cursor-default",
                      tag: "bg-primary text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 mb-2",
                      remove:
                        "text-white hover:text-red-200 cursor-pointer ml-1",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Custom File Upload */}
            <div className="row-span-2">
              <div
                className="mb-6 border-2 border-dashed w-full mx-auto border-borderGray rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain" 
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm text-gray-500 mb-2">
                      Drag and Drop here
                    </p>
                    <p className="text-sm text-gray-500 mb-2">or</p>
                    <label className="bg-primary text-white py-2 px-4 rounded cursor-pointer">
                      Select file
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileInputChange}
                        accept="image/*"
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Nutrition Facts and Recipe Facts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Nutrition Facts */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Nutrition Facts
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="calories"
                  placeholder="Calories"
                  value={formData.calories}
                  onChange={handleInputChange}
                  className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="carbs"
                  placeholder="Carbs"
                  value={formData.carbs}
                  onChange={handleInputChange}
                  className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="protein"
                  placeholder="Protein"
                  value={formData.protein}
                  onChange={handleInputChange}
                  className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
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
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Recipes fact
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="makingTime"
                  placeholder="Making time (hh:mm:ss)"
                  value={formData.makingTime}
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
                  placeholder="Time (hh:mm:ss)"
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
              {isLoading?<><CgSpinner></CgSpinner> "Uploading"</>: "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeUploadForm;
