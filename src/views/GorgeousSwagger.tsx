import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GORGEOUS_SWAGGER } from "../types/constant";
import { getStorageData } from "../types/utils";

function GorgeousSwagger() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(getStorageData(GORGEOUS_SWAGGER));
  }, []);
  return (
    <div className="flex bg-gray-50">
      <Sidebar activeItem={GORGEOUS_SWAGGER} />
      <div className="flex-grow p-6">SWAGGER</div>
    </div>
  );
}

export default GorgeousSwagger;
