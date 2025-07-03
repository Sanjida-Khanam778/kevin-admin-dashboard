import { useState } from "react";
import { LuEye } from "react-icons/lu";
import avatar from "../../assets/images/Avatar.png";
import toast from "react-hot-toast";
import Pagination from "../Shared/Pagination";
import { Link } from "react-router-dom";
import one from "../../assets/images/Workout/workout-1.webp";
import two from "../../assets/images/Workout/workout-2.jpg";
import three from "../../assets/images/Workout/workout-3.jpg";
import four from "../../assets/images/Workout/workout-4.png";
import five from "../../assets/images/Workout/workout-5.jpg";
import { Plus, SquarePen } from "lucide-react";
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal";
import { RiDeleteBin6Line } from "react-icons/ri";

const workout = [
  {
    id: "W001",
    image: one,
    name: "Leg plank",
    type: "Without equipment",
    target: "Belly",
  },
  {
    id: "W002",
    image: two,
    name: "Leg plank",
    type: "Without equipment",
    target: "Belly",
  },
  {
    id: "W003",
    image: three,
    name: "Leg plank",
    type: "Without equipment",
    target: "Belly",
  },
  {
    id: "W004",
    image: four,
    name: "Leg plank",
    type: "Without equipment",
    target: "Belly",
  },
  {
    id: "W005",
    image: five,
    name: "Leg plank",
    type: "Without equipment",
    target: "Belly",
  },
  {
    id: "W006",
    image: one,
    name: "Leg plank",
    type: "Without equipment",
    target: "Belly",
  },
  {
    id: "W007",
    image: two,
    name: "Leg plank",
    type: "Without equipment",
    target: "Belly",
  },
  {
    id: "W008",
    image: three,
    name: "Leg plank",
    type: "Without equipment",
    target: "Belly",
  },
];

export default function Workout() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDltModal, setOpenDltModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [workoutsState, setWorkoutsState] = useState(workout);

  const handleDeleteUser = async () => {
    setWorkoutsState((prev) => prev.filter((w) => w.id !== selectedUserId));
    toast.success("Workout deleted successfully");
    setOpenDltModal(false);
  };

  // Calculate filtered and searched data before pagination
  const filteredWorkouts = workoutsState.filter((w) => {
    // Filter by target (sortBy)
    const matchesTarget = sortBy === "" || w.target === sortBy;
    // Search by name (case-insensitive)
    const matchesQuery = w.name.toLowerCase().includes(query.toLowerCase());
    return matchesTarget && matchesQuery;
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  // Calculate current page data from filteredWorkouts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredWorkouts.slice(indexOfFirstItem, indexOfLastItem);

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case "Yearly":
        return "text-green-500";
      case "Monthly":
        return "text-yellow-500";
      case "Free":
        return "text-neutral/80";
    }
  };

  // Handle button click with event propagation stop
  const handleButtonClick = (event, modalSetter) => {
    event.stopPropagation();
    modalSetter(true);
  };

  return (
    <div className="bg-accent font-lora h-[90vh]">
      <div className="px-8 rounded-lg">
        {/* Search and filter bar */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Workout Management</h1>

          <div className="flex items-center gap-4">
            {/* search */}
            <input
              type="text"
              placeholder="Search by name..."
              className="p-2 border rounded-md bg-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* filter */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-borderGray rounded-md pl-6 pr-6 py-2 focus:outline-none focus:ring-1"
              >
                <option value={""}>All</option>
                <option value={"Arms"}>Sort by: Arms</option>
                <option value={"Legs"}>Sort by: Legs</option>
                <option value={"Chest"}>Sort by: Chest</option>
                <option value={"Back"}>Sort by: Back</option>
                <option value={"Shoulders"}>Sort by: Shoulders</option>
                <option value={"Belly"}>Sort by: Belly</option>
                <option value={"Abs"}>Sort by: Abs</option>
                <option value={"Full Body"}>Sort by: Full Body</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
            {/* add workout */}
            <Link to="/workout/upload">
              <button className="bg-primary text-white px-4 py-2 rounded-md">
                <Plus className="text-2xl" />
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full mx-auto mt-10">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-neutral tracking-wider">
                  Workout Name
                </th>

                <th className="px-6 py-3 text-left font-bold text-neutral tracking-wider">
                  Workout Type
                </th>
                <th className="px-6 py-3 text-left font-bold text-neutral tracking-wider">
                  For
                </th>
                <th className="px-6 py-3 text-right font-bold text-neutral tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderGray">
              {isLoading ? (
                <tr>
                  <td>loading..</td>
                </tr>
              ) : (
                currentUsers &&
                currentUsers?.map((user, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="w-8 h-8 mr-4 rounded-full"
                          src={user?.image || avatar}
                          alt=""
                        />
                        <div className="text-sm font-medium text-gray-900">
                          {user?.name}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${getTypeColor(user?.type)}`}>
                        {user?.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-subgray">{user?.target}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap space-x-5 text-right">
                      <Link to={`/workout/${user?.id}`}>
                        <button>
                          <LuEye className="text-2xl cursor-pointer" />
                        </button>
                      </Link>
                      <Link to={`/workout/update/${user?.id}`}>
                        <button>
                          <SquarePen className="text-2xl cursor-pointer" />
                        </button>
                      </Link>
                      <button
                        onClick={(e) => {
                          handleButtonClick(e, setOpenDltModal);
                          setSelectedUserId(user?.id);
                        }}
                      >
                        <RiDeleteBin6Line className="text-2xl text-red-500 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <DeleteConfirmationModal
              isOpen={openDltModal}
              onClose={() => setOpenDltModal(false)}
              onConfirm={handleDeleteUser}
            />
          </table>
        </div>

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}
