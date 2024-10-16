import { useEffect, useState } from "react";
import { CRUD_GENERATOR } from "../types/constant";
import { getStorageData } from "../types/utils";

function CRUDGenerator({ sidebar }: any) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(getStorageData(CRUD_GENERATOR));
    document.title = "CRUD Generator";
  }, []);
  return (
    <div className="flex bg-gray-50">
      {sidebar}
      <div className="flex-grow p-6">CRUD Generator</div>
    </div>
  );
}

export default CRUDGenerator;
