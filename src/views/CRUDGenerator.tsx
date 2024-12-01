import { useEffect, useState } from "react";
import { getStorageData } from "../types/utils";
import Sidebar from "../components/Sidebar";
import { CRUD_GENERATOR } from "../types/pageConfig";

function CRUDGenerator() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(getStorageData(CRUD_GENERATOR.name));
    document.title = CRUD_GENERATOR.label;
  }, []);
  return (
    <Sidebar
      activeItem={CRUD_GENERATOR.name}
      renderContent={<>CRUD GENERATOR</>}
    />
  );
}

export default CRUDGenerator;
