import React from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";

const RecipeInfoFields = ({
  formData,
  handleInputChange,
  tags,
  handleDelete,
  handleAddition,
  handleTagClick,
  onTagUpdate,
}) => (
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
        <option value="Snack">Snack</option>
        <option value="Snack 1">Snack 1</option>
        <option value="Lunch">Lunch</option>
        <option value="Snack 2">Snack 2</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack 3">Snack 3</option>
        <option value="Post-Dinner">Post-Dinner</option>
        <option value="Late Snack">Late Snack</option>
      </select>
    </div>
    <div>
      <label
        htmlFor="tagInput"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
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
            remove: "text-white hover:text-red-200 cursor-pointer ml-1",
          }}
        />
      </div>
    </div>
  </div>
);

export default RecipeInfoFields;
