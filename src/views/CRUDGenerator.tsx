import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { CRUD_GENERATOR } from "../types/pageConfig";

function CRUDGenerator() {
  useEffect(() => {
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
