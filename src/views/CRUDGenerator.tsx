import Sidebar from "../components/Sidebar";
import { CRUD_GENERATOR } from "../types/constant";

function CRUDGenerator() {
  return (
    <div className="flex bg-gray-50">
      <Sidebar activeItem={CRUD_GENERATOR} />
      <div className="flex-grow p-6">CRUD</div>
    </div>
  );
}

export default CRUDGenerator;
