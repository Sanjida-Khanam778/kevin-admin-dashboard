"use client";

import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import avatar from "../../assets/images/Avatar.png";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../Api/dashboardApi";

export default function UserDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [openDltModal, setOpenDltModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch users with pagination
  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useGetUsersQuery(currentPage);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUserId).unwrap();
      toast.success("User deleted successfully");
      refetch(); // Refetch the current page
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Delete error:", error);
    } finally {
      setOpenDltModal(false);
    }
  };

  // Get package type from package_name
  const getPackageType = (packageName) => {
    if (!packageName || !packageName.package_name) return "Free";
    const name = packageName.package_name.toLowerCase();
    if (name.includes("year")) return "Yearly";
    if (name.includes("month")) return "Monthly";
    return "Free";
  };

  // Filter users based on search query and sort
  const filteredUsers =
    usersData?.results?.filter((user) => {
      const packageType = getPackageType(user.package_name);
      const matchesType = sortBy === "" || packageType === sortBy;
      const matchesQuery =
        user.fullname?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase()) ||
        false;
      return matchesType && matchesQuery;
    }) || [];

  // Get type color
  const getTypeColor = (packageName) => {
    const type = getPackageType(packageName);
    switch (type) {
      case "Yearly":
        return "text-green-500";
      case "Monthly":
        return "text-yellow-500";
      case "Free":
        return "text-neutral/80";
      default:
        return "text-neutral/80";
    }
  };

  // Handle pagination
  const totalPages = usersData ? Math.ceil(usersData.count / 5) : 1;

  // Handle button click with event propagation stop
  const handleButtonClick = (event, modalSetter) => {
    event.stopPropagation();
    modalSetter(true);
  };

  if (error) {
    return (
      <div className="bg-accent font-lora h-[90vh] flex items-center justify-center">
        <div className="text-red-500">Error loading users: {error.message}</div>
      </div>
    );
  }

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
              placeholder="Search by name or email..."
              className="p-2 border rounded-md bg-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* filter */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-6 pr-6 py-2 focus:outline-none focus:ring-1"
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
            <thead>
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
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                      <span className="ml-2">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="w-8 h-8 mr-4 rounded-full"
                          src={user.image || avatar}
                          alt=""
                          onError={(e) => {
                            e.target.src = avatar;
                          }}
                        />
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullname || "No Name"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${getTypeColor(user.package_name)}`}
                      >
                        {getPackageType(user.package_name)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-5 text-right">
                      <Link to={`/clients/${user.id}`}>
                        <button>
                          <LuEye className="text-2xl cursor-pointer" />
                        </button>
                      </Link>
                      <button
                        onClick={(e) => {
                          handleButtonClick(e, setOpenDltModal);
                          setSelectedUserId(user.id);
                        }}
                        disabled={isDeleting}
                      >
                        <RiDeleteBin6Line className="text-2xl text-red-500 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {usersData ? (currentPage - 1) * 5 + 1 : 0}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {usersData ? Math.min(currentPage * 5, usersData.count) : 0}
                </span>{" "}
                of <span className="font-medium">{usersData?.count || 0}</span>{" "}
                results
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || isLoading}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-50 border border-blue-200 rounded-md">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages || isLoading}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <DeleteConfirmationModal
          isOpen={openDltModal}
          onClose={() => setOpenDltModal(false)}
          onConfirm={handleDeleteUser}
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
}
