export default function UserInfo() {
  return (
    <div>
      <div className="bg-sidebar rounded-xl p-6">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col items-center justify-center space-x-6">
            <div className="w-20 h-20 flex items-center justify-center overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold text-primary mb-1">
              Maria González
            </h1>
            <p className="text-gray-600 text-sm mb-4">Johndoe393@Gmail.Com</p>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-8">
            <div>
              <span className="text-lg text-primary font-semibold ">
                Subscription PLAN:
              </span>
              <p className="text-gray-600 text-sm">Yearly plan</p>
            </div>

            <div>
              <span className="text-lg text-primary font-semibold ">
                Price:
              </span>
              <p className="text-gray-600 text-sm">$200.00/Monthly</p>
            </div>
            <div>
              <span className="text-lg text-primary font-semibold ">
                Status:
              </span>
              <p className="text-purple-600 text-sm font-medium">Active</p>
            </div>
            
            <div>
              <span className="text-lg text-primary font-semibold ">
                Start Date:
              </span>
              <p className="text-gray-600 text-sm">1/15/2023</p>
            </div>
            <div>
              <span className="text-lg text-primary font-semibold ">
                Next Billing Date:
              </span>
              <p className="text-gray-600 text-sm">5/15/2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
