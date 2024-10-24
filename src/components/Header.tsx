import { DownloadIcon, PlusIcon, UploadIcon } from "lucide-react";

const Header = ({ SearchBoxes, onCreate, onImport, onExport }: any) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">{SearchBoxes}</div>
    <div className="flex items-center space-x-4">
      {onExport && (
        <button
          onClick={onExport}
          className="border border-blue-500 border-dashed text-blue-500 hover:text-blue-800 hover:border-blue-800 hover:bg-gray-50 transition duration-200 ease-in-out p-2 rounded-lg flex items-center justify-center"
        >
          <DownloadIcon size={20} className="mr-2" />
          <span className="font-semibold text-lg text-center">Export</span>
        </button>
      )}
      {onImport && (
        <button
          onClick={onImport}
          className="border border-blue-500 border-dashed text-blue-500 hover:text-blue-800 hover:border-blue-800 hover:bg-gray-50 transition duration-200 ease-in-out p-2 rounded-lg flex items-center justify-center"
        >
          <UploadIcon size={20} className="mr-2" />
          <span className="font-semibold text-lg text-center">Import</span>
        </button>
      )}
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
  </div>
);

export default Header;
