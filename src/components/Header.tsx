import { EraserIcon, PlusIcon, SearchIcon } from "lucide-react";

const Header = ({
  SearchBoxes,
  onSearch,
  onCreate,
  onClear,
  createDisabled = false,
}: any) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      {SearchBoxes}
      <button
        onClick={onSearch}
        className="bg-blue-600 hover:bg-blue-900 text-white border p-2 rounded-lg flex items-center mr-2"
      >
        <SearchIcon size={20} />
        <span className="ml-1">Tìm kiếm</span>
      </button>
      <button
        onClick={onClear}
        className="bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100 border p-2 rounded-lg flex items-center"
      >
        <EraserIcon size={20} />
        <span className="ml-1">Xóa</span>
      </button>
    </div>
    {!createDisabled && (
      <button
        onClick={onCreate}
        className="bg-gray-600 hover:bg-gray-800 text-white p-2 rounded-lg flex items-center"
      >
        <PlusIcon size={20} className="mr-1" /> Thêm
      </button>
    )}
  </div>
);

export default Header;
