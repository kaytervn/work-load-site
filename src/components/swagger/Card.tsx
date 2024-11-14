import {
  ArrowLeftRightIcon,
  CalendarFoldIcon,
  EditIcon,
  ExternalLinkIcon,
  RepeatIcon,
  Trash2Icon,
} from "lucide-react";
import RadioButtons from "../RadioButtons";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { truncateString, updateItemInStorage } from "../../types/utils";
import { GORGEOUS_SWAGGER } from "../../types/constant";

const Card = ({ item, onConvert, onUpdate, onDelete, onExport }: any) => {
  const [initialValue, setInitialValue] = useState<any>(null);
  const [options, setOptions] = useState<any>([]);
  useEffect(() => {
    setInitialValue(item.local?.isInit ? item.local.url : item.remote.url);
    const newOptions = [];
    if (item.local) {
      newOptions.push({
        label: `${item.local.url}/v2/api-docs`,
        value: item.local.url,
      });
    }
    if (item.remote) {
      newOptions.push({
        label: `${item.remote.url}/v2/api-docs`,
        value: item.remote.url,
      });
    }
    setOptions(newOptions);
  }, [item]);
  const handleRadioChange = (value: any) => {
    const updatedItem = { ...item };
    if (value === item.local.url) {
      updatedItem.local = {
        ...updatedItem.local,
        isInit: true,
      };
      updatedItem.remote = {
        ...updatedItem.remote,
        isInit: false,
      };
    } else {
      updatedItem.local = {
        ...updatedItem.local,
        isInit: false,
      };
      updatedItem.remote = {
        ...updatedItem.remote,
        isInit: true,
      };
    }
    updateItemInStorage(GORGEOUS_SWAGGER, updatedItem, item.id);
  };
  return (
    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg border border-gray-100">
      <div
        className="h-48 relative flex flex-col justify-between p-4"
        style={{
          background: `linear-gradient(45deg, ${item.color}, ${item.color}dd)`,
        }}
      >
        <div className="flex justify-between items-start">
          <div className="bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-white flex items-center space-x-2">
            <CalendarFoldIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {format(new Date(item.createdAt), "dd/MM/yyyy")}
            </span>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => onExport(item.id)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 text-white"
              title="Export"
            >
              <ExternalLinkIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onUpdate(item.id)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 text-white"
              title="Edit"
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 text-white"
              title="Delete"
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <h2 className="text-3xl font-bold text-white tracking-tight whitespace-nowrap">
            {truncateString(item.collectionName, 25)}
          </h2>
          <div className="inline-flex mt-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-white items-center space-x-2">
            <RepeatIcon className="w-4 h-4" />
            <span className="font-medium">
              {item.requests?.length || 0} Requests
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="bg-gray-50 rounded-xl p-2">
          <RadioButtons
            options={options}
            selectedValue={initialValue}
            onValueChange={handleRadioChange}
          />
        </div>
        <button
          onClick={() => onConvert(item.id)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <ArrowLeftRightIcon className="w-5 h-5" />
          <span>CONVERT</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
