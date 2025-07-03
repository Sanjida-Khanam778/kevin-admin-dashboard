import React, { useState } from "react";
import FileUpload from "../Shared/FileUpload";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import toast from "react-hot-toast";

const WorkoutUploadForm = () => {
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
  const [resetFileUpload, setResetFileUpload] = useState(false);

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

  const handleFileUpload = (files) => {
    console.log("Files uploaded:", files);
    // You can add your file upload logic here
    // For example, upload to server, store in state, etc.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Workout uploaded successfully!");

    // Reset all form fields
    setFormData({
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

    // Clear tags
    setTags([]);

    // Reset file upload
    setResetFileUpload(true);

    // Reset the reset flag after a short delay
    setTimeout(() => {
      setResetFileUpload(false);
    }, 100);
  };

  return (
    <div className="mx-auto p-6 bg-white h-[90vh] overflow-y-scroll w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to={"/workout"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            Upload Workout
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Top Row */}
            {/* Workout Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Workout Name
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

            {/* Time Needed */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Time Needed
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
            {/* For Body Part */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                For Body Part
              </label>
              <div className="relative">
                <select
                  name="forTime"
                  value={formData.forTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 appearance-none pr-10"
                >
                  <option value="arms">Arms</option>
                  <option value="legs">Legs</option>
                  <option value="back">Back</option>
                  <option value="chest">Chest</option>
                  <option value="shoulder">Shoulder</option>
                  <option value="belly">Belly</option>
                  <option value="abs">Abs</option>
                  <option value="fullBody">Full Body</option>
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
            {/* Workout Type */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Workout Type
              </label>
              <div className="relative">
                <select
                  name="forTime"
                  value={formData.forTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 appearance-none pr-10"
                >
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
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

            {/* Calories burn */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Calories burn
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
            {/* Equipment Needed */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Equipment Needed
              </label>
              <div className="relative">
                <select
                  name="forTime"
                  value={formData.forTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 appearance-none pr-10"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
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
                  tags: "flex gap-3 overflow-x-auto whitespace-nowrap",
                  tagInput: "flex-1",
                  tagInputField:
                    "px-2 py-1 bg-gray-100 border-none outline-none text-sm cursor-default",
                  tag: "bg-primary text-white px-3 py-1 rounded-md text-sm flex flex-row items-center gap-2",
                  remove: "text-white hover:text-red-200 cursor-pointer ml-1",
                }}
              />
            </div>
          </div>

          {/* Nutrition Facts and Recipe Facts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* File Upload */}
            <div className="row-span-2">
              <label className="block font-medium text-gray-700 mb-2">
                Upload photo
              </label>
              <FileUpload
                onFileSelect={handleFileUpload}
                accept="image/*"
                maxSize={5 * 1024 * 1024} // 5MB
                label="Drop your recipe image here or"
                subLabel="Click to upload"
                fileTypes="JPG, PNG, SVG, GIF"
                reset={resetFileUpload}
                defaultImage={null}
              />
            </div>
            {/* Benefits */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Benefits
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
    </div>
  );
};

export default WorkoutUploadForm;
