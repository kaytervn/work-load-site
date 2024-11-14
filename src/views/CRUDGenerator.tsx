import { useEffect, useState } from "react";
import { CRUD_GENERATOR } from "../types/constant";
import { getStorageData } from "../types/utils";
import Sidebar from "../components/Sidebar";

function CRUDGenerator() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(getStorageData(CRUD_GENERATOR));
    document.title = "CRUD Generator";
  }, []);
  return (
    <Sidebar activeItem={CRUD_GENERATOR} renderContent={<>CRUD GENERATOR</>} />
  );
}

export default CRUDGenerator;
