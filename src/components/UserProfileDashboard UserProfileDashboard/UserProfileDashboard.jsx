import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import UserInfo from "../ClientDetailsPage/UserInfo";
import UserStats from "../ClientDetailsPage/UserStats";

const UserProfileDashboard = () => {
  return (
    <div className="h-[90vh] p-4 overflow-y-scroll">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to={"/clients"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
        </div>

        {/* User Info Card */}
        <UserInfo />

        {/* User Stats */}
        <UserStats />
      </div>
    </div>
  );
};

export default UserProfileDashboard;
