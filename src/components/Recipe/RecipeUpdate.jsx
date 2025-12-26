import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useGetRecipeQuery, useUpdateRecipeMutation } from "../../Api/authApi";
import { CgSpinner } from "react-icons/cg";

const RecipeUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: isFetching } = useGetRecipeQuery(id);
  const [updateRecipe, { isLoading }] = useUpdateRecipeMutation();

  const [formData, setFormData] = useState({ recipeName: "", category: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (data) {
      setFormData({
        recipeName: data.food_name || data.recipe_name || "",
        category: data.category || "",
      });
      setImagePreview(data.image || null);
      setImageFile(null);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target?.files ? e.target.files[0] : e;
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files && e.dataTransfer.files[0];
    if (file) handleFileInputChange(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("food_name", formData.recipeName);
      form.append("category", formData.category);
      if (imageFile) form.append("image", imageFile);

      await updateRecipe({ id, data: form }).unwrap();
      toast.success("Recipe updated successfully!");
      navigate("/recipe");
    } catch (err) {
      const msg = err?.data?.message || err?.error || "Failed to update recipe";
      toast.error(msg);
    }
  };

  if (isFetching) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="mx-auto p-6 bg-white h-[90vh] overflow-y-scroll w-full">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to={"/recipe"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            Update Recipe
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipe Name
              </label>
              <input
                type="text"
                name="recipeName"
                value={formData.recipeName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-borderGray rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-borderGray rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
                className="mt-1 flex items-center justify-center h-48 w-full border-2 border-dashed border-borderGray rounded cursor-pointer bg-white hover:bg-gray-50 relative"
              >
                {!imagePreview ? (
                  <div className="text-center px-4">
                    <p className="text-sm text-gray-600">
                      Drag & drop an image here
                    </p>
                    <p className="text-sm text-gray-500">or click to select</p>
                  </div>
                ) : (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {imagePreview && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              aria-label="Update Recipe"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-4">
                  <CgSpinner className="inline animate-spin" />
                  <span> Updating...</span>
                </div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeUpdate;
