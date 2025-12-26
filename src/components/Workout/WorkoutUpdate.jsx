import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import {
  useGetWorkoutQuery,
  useUpdateWorkoutMutation,
} from "../../Api/authApi";

const WorkoutUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // States for the form and files
  const [formData, setFormData] = useState({
    code: "",
    workout_name: "",
    exercise_type: "cardio",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState("");

  // References for file inputs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Fetch workout data based on ID
  const { data: workout } = useGetWorkoutQuery(id, { skip: !id });

  // Update form data once the workout data is fetched
  useEffect(() => {
    if (workout) {
      setFormData({
        code: workout.code || "",
        workout_name: workout.workout_name || "",
        exercise_type: workout.exercise_type || "cardio",
      });
      setImagePreview(workout.image || null);
      setVideoName(workout.video || "");
    }
  }, [workout]);

  // Handlers for file upload
  const handleDragOver = (e) => e.preventDefault();

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) {
      setVideoFile(file);
      setVideoName(file.name);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = null;
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoName("");
    if (videoInputRef.current) videoInputRef.current.value = null;
  };

  // Mutation to update workout data
  const [updateWorkout, { isLoading }] = useUpdateWorkoutMutation();

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file changes
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoName(file.name);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("code", formData.code);
      form.append("exercise_type", formData.exercise_type);
      form.append("workout_name", formData.workout_name);
      if (imageFile) form.append("image", imageFile);
      if (videoFile) form.append("video", videoFile);

      console.log({
        code: formData.code,
        exercise_type: formData.exercise_type,
        workout_name: formData.workout_name,
        image: imageFile,
        video: videoFile,
      });

      await updateWorkout({ form, id }).unwrap();
      toast.success("Workout updated successfully!");
      navigate("/workout");
    } catch (err) {
      const msg =
        err?.data?.message || err?.error || "Failed to upload workout";
      toast.error(msg);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white h-[90vh] overflow-y-scroll w-full">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to={"/workout"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            Update Workout
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Workout Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Code
              </label>
              <input
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-borderGray rounded px-3 py-2 bg-gray-50"
                placeholder="Type here"
                required
              />
            </div>

            {/* Workout Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Workout Name
              </label>
              <input
                name="workout_name"
                value={formData.workout_name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-borderGray rounded px-3 py-2 bg-gray-50"
                placeholder="Type here"
                required
              />
            </div>

            {/* Exercise Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type of Exercise
              </label>
              <select
                name="exercise_type"
                value={formData.exercise_type}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-borderGray rounded px-3 py-2 bg-gray-50"
              >
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
                <option value="flexibility">Flexibility</option>
                <option value="balance">Balance</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Workout Image
              </label>
              <div
                onDragOver={handleDragOver}
                onDrop={handleImageDrop}
                onClick={() =>
                  imageInputRef.current && imageInputRef.current.click()
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
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {imagePreview && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Workout Video
              </label>
              <div
                onDragOver={handleDragOver}
                onDrop={handleVideoDrop}
                onClick={() =>
                  videoInputRef.current && videoInputRef.current.click()
                }
                className="mt-1 flex items-center justify-center h-48 w-full border-2 border-dashed border-borderGray rounded cursor-pointer bg-white hover:bg-gray-50 relative"
              >
                {!videoName ? (
                  <div className="text-center px-4">
                    <p className="text-sm text-gray-600">
                      Drag & drop a video here
                    </p>
                    <p className="text-sm text-gray-500">or click to select</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <div className="text-left">
                      <div className="font-medium text-gray-800 truncate w-56">
                        {videoName}
                      </div>
                      <div className="text-xs text-gray-500">
                        Click to change or drag another file
                      </div>
                    </div>
                  </div>
                )}

                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />

                {videoName && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVideo();
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                    aria-label="Remove video"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CgSpinner className="inline animate-spin mr-2" /> Updating...
                </>
              ) : (
                "Update Workout"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutUpdate;
