import React from "react";
import { CgSpinner } from "react-icons/cg";

const UploadButton = ({ isLoading }) => (
  <button
    type="submit"
    className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
    aria-label="Upload Recipe"
  >
    {isLoading ? (
      <>
        <CgSpinner className="inline animate-spin mr-2" /> Uploading
      </>
    ) : (
      "Upload"
    )}
  </button>
);

export default UploadButton;
