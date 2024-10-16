import { PlusIcon } from "lucide-react";

const Header = ({ SearchBoxes, onCreate }: any) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">{SearchBoxes}</div>
    {onCreate && (
      <button
        onClick={onCreate}
        className="bg-gray-600 hover:bg-gray-800 text-white p-2 rounded-lg flex items-center justify-center"
      >
        <PlusIcon size={20} className="mr-2" />
        <span className="font-semibold text-lg text-center">New</span>
      </button>
    )}
  </div>
);

export default Header;
