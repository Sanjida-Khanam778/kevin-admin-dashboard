import { useState } from "react";
import { GoPencil } from "react-icons/go";
const data = [
  {
    id: "#BB32",
    package_amount: 200,
    package_type: "Yearly",
    package_status: "Active",
  },
  {
    id: "#BD21",
    package_amount: 20,
    package_type: "Monthly",
    package_status: "Postpone",
  },
  {
    id: "#AB41",
    package_amount: 0,
    package_type: "Free",
    package_status: "Active",
  },
];
export default function Recipe() {
  const [isLoading, setIsLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [packages, setPackages] = useState(data);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleAmountChange = (index, value, id) => {
    const updatedPackages = packages.map((pkg, i) =>
      i === index ? { ...pkg, package_amount: value } : pkg
    );
    setPackages(updatedPackages);
    const newAmountData = {
      id,
      package_amount: { package_amount: value },
    };
    sendPackageAmount(newAmountData)
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        toast.error("Failed to update status");
      });
  };

  const handleStatusChange = (index, newStatus, id) => {
    const updatedPackages = packages.map((pkg, i) =>
      i === index ? { ...pkg, package_status: newStatus } : pkg
    );

    setPackages(updatedPackages);
    const newStatusData = {
      id,
      package_status: { package_status: newStatus },
    };
    sendPackageStatus(newStatusData)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((error) => {
        toast.error("Failed to update status");
      });
  };

  const getStatusColor = (package_status) => {
    return package_status === "Active" ? " text-green-400" : "text-red-500";
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Yearly":
        return "text-[#A855F7]";
      case "Monthly":
        return "text-[#A855F7]";
      case "Free":
        return "text-neutral/40";
    }
  };
  return (
    <div className="p-4 px-8">
      <h1 className="text-3xl font-semibold">Subscription Type</h1>
      <div className="overflow-x-auto w-10/12 mx-auto mt-20">
        <table className="w-full">
          <thead>
            <tr className="text-left text-subgray border-b border-borderGray">
              <th className="pb-3 font-medium text-center">Package ID</th>
              <th className="pb-3 font-medium text-center">Package Amount</th>
              <th className="pb-3 font-medium text-center">Type</th>
              <th className="pb-3 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? "Loading"
              : packages?.map((pkg, index) => (
                  <tr key={index} className="">
                    <td className="py-4 text-[#222222] font-semibold text-center">
                      {pkg.id}
                    </td>

                    <td className="py-4 font-medium text-subgray text-center">
                      {editIndex === index ? (
                        <input
                          className="w-24 px-4 py-1 border border-borderGray rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          type="number"
                          value={pkg.package_amount}
                          onChange={(e) =>
                            handleAmountChange(index, e.target.value, pkg.id)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              setEditIndex(null); // exit edit mode on Enter
                            }
                          }}
                          autoFocus
                          onBlur={() => setEditIndex(null)}
                        />
                      ) : (
                        <div
                          onClick={
                            pkg.package_type !== "Free"
                              ? () => handleEdit(index)
                              : undefined
                          }
                          className={`flex justify-between w-48 mx-auto ${
                            pkg.package_type !== "Free"
                              ? " cursor-pointer gap-24 items-center "
                              : "cursor-default justify-start"
                          }`}
                        >
                          <span>{pkg.package_amount} $</span>
                          <span>
                            {pkg.package_type !== "Free" && <GoPencil />}
                          </span>
                        </div>
                      )}
                    </td>
                    <td
                      className={`py-4 font-medium text-center ${getTypeColor(
                        pkg.package_type
                      )}`}
                    >
                      {pkg.package_type}
                    </td>
                    <td className="py-4 text-center ">
                      <div className="relative inline-block">
                        {pkg.package_type !== "Free" ? (
                          <select
                            name="status"
                            value={pkg.package_status}
                            onChange={(e) => {
                              handleStatusChange(index, e.target.value, pkg.id);
                            }}
                            className={`appearance-none pr-8 pl-5 py-2 rounded-full text-xs font-bold outline-none cursor-pointer shadow-lg ${getStatusColor(
                              pkg.package_status
                            )}`}
                          >
                            <option
                              className="text-black bg-white"
                              value="Active"
                            >
                              Active
                            </option>
                            <option
                              className="text-black bg-white"
                              value="Postpone"
                            >
                              Postpone
                            </option>
                          </select>
                        ) : (
                          <p
                            className={`px-9 py-2 rounded-full text-xs font-bold outline-none text-green-400 shadow-lg cursor-not-allowed`}
                          >
                            Active
                          </p>
                        )}

                        {/* Custom dropdown arrow */}
                        {pkg.package_type !== "Free" && (
                          <div
                            className={`pointer-events-none absolute inset-y-2 right-2 flex items-center text-gray-700 ${getStatusColor(
                              pkg.package_status
                            )}`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
