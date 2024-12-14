import { SquareArrowOutUpRightIcon } from "lucide-react";

const ToolCard = ({ item, onButtonClick }: any) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg border border-gray-100">
      <div
        className="h-48 relative flex flex-col justify-between p-4"
        style={{
          background: `linear-gradient(45deg, ${item.color}, ${item.color}dd)`,
        }}
      >
        <div className="opacity-25">
          {item.icon ? <item.icon className="w-16 h-16 text-white" /> : null}
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight whitespace-nowrap">
          {item.label}
        </h2>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <button
          onClick={onButtonClick}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <SquareArrowOutUpRightIcon className="w-5 h-5" />
          <span>OPEN</span>
        </button>
      </div>
    </div>
  );
};

export default ToolCard;
