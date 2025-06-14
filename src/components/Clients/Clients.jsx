import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import avatar from "../../assets/images/Avatar.png";
import toast from "react-hot-toast";
import Modal from "../Shared/Modal";
import Pagination from "../Shared/Pagination";
import Button from "../Shared/Button";
import { RxCross2 } from "react-icons/rx";

const users = [
  {
    userName: "Jake Riggins",
    email: "jake.riggins@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    userName: "Sarah Newton",
    email: "sarah.newton@email.com",
    type: "Free",
    photo: "https://i.pravatar.cc/150?img=2",
  },
  {
    userName: "Leo Matthews",
    email: "leo.matthews@email.com",
    type: "Monthly",
    photo: "https://i.pravatar.cc/150?img=3",
  },
  {
    userName: "Mia Harper",
    email: "mia.harper@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=4",
  },
  {
    userName: "Ethan Blake",
    email: "ethan.blake@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    userName: "Ava Robinson",
    email: "ava.robinson@email.com",
    type: "Free",
    photo: "https://i.pravatar.cc/150?img=6",
  },
  {
    userName: "Noah Carter",
    email: "noah.carter@email.com",
    type: "Monthly",
    photo: "https://i.pravatar.cc/150?img=7",
  },
  {
    userName: "Grace Watson",
    email: "grace.watson@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=8",
  },
  {
    userName: "Lucas James",
    email: "lucas.james@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=9",
  },
  {
    userName: "Lily Brooks",
    email: "lily.brooks@email.com",
    type: "Monthly",
    photo: "https://i.pravatar.cc/150?img=10",
  },
  {
    userName: "Mason Lee",
    email: "mason.lee@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=11",
  },
  {
    userName: "Chloe Davis",
    email: "chloe.davis@email.com",
    type: "Free",
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    userName: "Benjamin Adams",
    email: "ben.adams@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=13",
  },
  {
    userName: "Amelia Clark",
    email: "amelia.clark@email.com",
    type: "Monthly",
    photo: "https://i.pravatar.cc/150?img=14",
  },
  {
    userName: "Henry Cooper",
    email: "henry.cooper@email.com",
    type: "Yearly",
    photo: "https://i.pravatar.cc/150?img=15",
  },
];

export default function UserDataTable() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDltModal, setOpenDltModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteUser = async () => {
    try {
      const res = await deleteUser(selectedUserId).unwrap();
      console.log(res);
      toast.success(res?.message);
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Delete error:", error);
    }
    setOpenDltModal(false); // close modal
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  // Calculate current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users?.slice(indexOfFirstItem, indexOfLastItem);

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
            <input
              type="text"
              placeholder="Search by name..."
              className="p-2 border rounded-md bg-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
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
                      <button
                        onClick={(e) => {
                          setSelectedUserId(user?.user_id);
                        }}
                      >
                        <LuEye className="text-2xl cursor-pointer" />
                      </button>
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
            <Modal isOpen={openDltModal} onClose={() => setOpenDltModal(false)}>
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 max-w-sm w-full flex flex-col items-center text-center relative">
                  {/* Close icon */}
                  <div onClick={() => setOpenDltModal(false)}>
                    <RxCross2 className="absolute top-4 right-4 cursor-pointer text-xl" />
                  </div>

                  {/* Warning message */}
                  <h2 className="text-red-500 font-semibold text-xl mt-6 mb-8">
                    Are you sure !!
                  </h2>

                  {/* Confirmation question */}
                  <p className="text-primary text-lg mb-8">
                    Do you want to delete this user ?
                  </p>

                  <div onClick={handleDeleteUser}>
                    <Button>Delete</Button>
                  </div>
                </div>
              </div>
            </Modal>
          </table>
        </div>

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}
