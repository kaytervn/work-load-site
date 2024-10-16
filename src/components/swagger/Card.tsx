import {
  ArrowLeftRightIcon,
  CalendarFoldIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react";
import Button from "../Button";
import RadioButtons from "../RadioButtons";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { updateItemInStorage } from "../../types/utils";
import { GORGEOUS_SWAGGER } from "../../types/constant";

const Card = ({ item, onConvert, onEdit, onDelete }: any) => {
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
    <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-2xl relative flex flex-col h-full">
      <div className="absolute top-3 left-3 text-gray-200 flex items-center space-x-1 text-sm">
        <CalendarFoldIcon className="w-4 h-4" />
        <span>{format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")}</span>
      </div>
      <div className="absolute top-3 right-3 flex space-x-2">
        <button
          onClick={() => onEdit(item.id)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-150"
        >
          <EditIcon className="w-5 h-5 text-blue-600" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-150"
        >
          <Trash2Icon className="w-5 h-5 text-red-600" />
        </button>
      </div>
      <div
        className="h-36 bg-gradient-to-r flex items-center justify-center"
        style={{ background: `${item.color}` }}
      >
        <h2 className="text-2xl font-bold text-white text-center uppercase tracking-wide">
          {item.collectionName}
        </h2>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <RadioButtons
            options={options}
            selectedValue={initialValue}
            onValueChange={handleRadioChange}
          />
        </div>
        <Button
          onPress={() => onConvert(item.id)}
          title="Convert"
          icon={ArrowLeftRightIcon}
        />
      </div>
    </div>
  );
};

export default Card;
