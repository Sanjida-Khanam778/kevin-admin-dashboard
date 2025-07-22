import React from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";

const TagInput = ({
  tags,
  handleDelete,
  handleAddition,
  handleTagClick,
  onTagUpdate,
}) => (
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
);

export default TagInput;
