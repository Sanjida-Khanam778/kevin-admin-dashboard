import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import avatar from "../../assets/images/Avatar.png";
import toast from "react-hot-toast";
import Modal from "../Shared/Modal";
import Pagination from "../Shared/Pagination";
import Button from "../Shared/Button";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal";
import React from "react";

const initialUsers = [
  {
    user_id: 1,
    userName: "Jake Riggins",
    email: "jake.riggins@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    user_id: 2,
    userName: "Sarah Newton",
    email: "sarah.newton@email.com",
    type: "Free",
    photo: "https://i.pravatar.cc/150?img=2",
  },
  {
    user_id: 3,
    userName: "Leo Matthews",
    email: "leo.matthews@email.com",
    type: "Monthly",
    photo: "https://i.pravatar.cc/150?img=3",
  },
  {
    user_id: 4,
    userName: "Mia Harper",
    email: "mia.harper@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=4",
  },
  {
    user_id: 5,
    userName: "Ethan Blake",
    email: "ethan.blake@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    user_id: 6,
    userName: "Ava Robinson",
    email: "ava.robinson@email.com",
    type: "Free",
    photo: "https://i.pravatar.cc/150?img=6",
  },
  {
    user_id: 7,
    userName: "Noah Carter",
    email: "noah.carter@email.com",
    type: "Monthly",
    photo: "https://i.pravatar.cc/150?img=7",
  },
  {
    user_id: 8,
    userName: "Grace Watson",
    email: "grace.watson@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=8",
  },
  {
    user_id: 9,
    userName: "Lucas James",
    email: "lucas.james@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=9",
  },
  {
    user_id: 10,
    userName: "Lily Brooks",
    email: "lily.brooks@email.com",
    type: "Monthly",
    photo: "https://i.pravatar.cc/150?img=10",
  },
  {
    user_id: 11,
    userName: "Mason Lee",
    email: "mason.lee@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=11",
  },
  {
    user_id: 12,
    userName: "Chloe Davis",
    email: "chloe.davis@email.com",
    type: "Free",
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    user_id: 13,
    userName: "Benjamin Adams",
    email: "ben.adams@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=13",
  },
  {
    user_id: 14,
    userName: "Amelia Clark",
    email: "amelia.clark@email.com",
    type: "Monthly",
    photo: "https://i.pravatar.cc/150?img=14",
  },
  {
    user_id: 15,
    userName: "Henry Cooper",
    email: "henry.cooper@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=15",
  },
];

export default function UserDataTable() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDltModal, setOpenDltModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      // Remove user from state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.user_id !== selectedUserId)
      );
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Delete error:", error);
    } finally {
      setIsLoading(false);
      setOpenDltModal(false);
    }
  };

  // Calculate filtered and searched data before pagination
  const filteredUsers = users.filter((u) => {
    // Filter by type (sortBy)
    const matchesType = sortBy === "" || u.type === sortBy;
    // Search by userName (case-insensitive)
    const matchesQuery = u.userName.toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesQuery;
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  // Calculate current page data from filteredUsers
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query, sortBy]);

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
          <h1 className="text-3xl font-semibold">Client Management</h1>

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
                <option value={"Yearly"}>Sort by: Yearly</option>
                <option value={"Monthly"}>Sort by: Monthly</option>
                <option value={"Free"}>Sort by: Free</option>
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
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full mx-auto mt-10">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral tracking-wider">
                  User name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral tracking-wider">
                  Email
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium text-neutral tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-neutral tracking-wider">
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
                          src={user?.photo || avatar}
                          alt=""
                        />
                        <div className="text-sm font-medium text-gray-900">
                          {user?.userName ||
                            user.first_name + " " + user.last_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-subgray">{user?.email}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${getTypeColor(user?.type)}`}>
                        {user?.type}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap space-x-5 text-right">
                      <Link to={`/clients/${user?.user_id}`}>
                        <button>
                          <LuEye className="text-2xl cursor-pointer" />
                        </button>
                      </Link>
                      <button
                        onClick={(e) => {
                          handleButtonClick(e, setOpenDltModal);
                          setSelectedUserId(user?.user_id);
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
