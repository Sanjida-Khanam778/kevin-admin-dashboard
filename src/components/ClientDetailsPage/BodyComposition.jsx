export default function BodyComposition() {
  const bodyComposition = [
    { label: "Body Fat", percentage: 45 },
    { label: "Skeletal mass", percentage: 65 },
    { label: "Water", percentage: 55 },
    { label: "BMC", percentage: 85 },
  ];
  const ProgressBar = ({ percentage, color = "bg-gray-800" }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
  return (
    <div className="border border-outline rounded-xl p-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Body Composition
      </h3>
      <div className="space-y-4">
        {bodyComposition.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-24">{item.label}</span>
            <div className="flex-1 mx-3">
              <ProgressBar percentage={item.percentage} />
            </div>
            <span className="text-sm font-medium text-gray-900 w-8">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
