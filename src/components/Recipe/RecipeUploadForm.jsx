import React, { useState } from "react";
import FileUpload from "../Shared/FileUpload";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import toast from "react-hot-toast";
import { useCreateRecipeMutation } from "../../Api/authApi";
import { CgSpinner } from "react-icons/cg";
import RecipeInfoFields from "./RecipeInfoFields";
import TagInput from "./TagInput";
import ImageUpload from "./ImageUpload";
import NutritionFacts from "./NutritionFacts";
import RecipeFacts from "./RecipeFacts";
import IngredientsInput from "./IngredientsInput";
import InstructionsInput from "./InstructionsInput";
import UploadButton from "./UploadButton";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      form.append("category", formData.category);
      form.append("time", formData.time);
      form.append("ingredients", formData.ingredients);
      form.append("instructions", formData.instructions);
      if (imageFile) {
        form.append("image", imageFile);
      }
      // Log FormData content
      for (let pair of form.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }
      await createRecipe(form).unwrap();
      toast.success("Recipe uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload recipe");
    } finally {
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
      setImagePreview(null);
      // setResetFileUpload(true);
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
            <RecipeInfoFields
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <TagInput
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleTagClick={handleTagClick}
              onTagUpdate={onTagUpdate}
            />
            <ImageUpload
              imagePreview={imagePreview}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleFileInputChange={handleFileInputChange}
              setImageFile={setImageFile}
              setImagePreview={setImagePreview}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NutritionFacts
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <RecipeFacts
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IngredientsInput
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <InstructionsInput
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center pt-6">
            <UploadButton isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeUploadForm;
