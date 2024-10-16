import { ArrowLeftRightIcon, CodeXmlIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CRUD_GENERATOR, GORGEOUS_SWAGGER } from "../types/constant";

const Sidebar = ({ activeItem, imgSrc }: any) => {
  const navigate = useNavigate();
  const menuItems = [
    {
      name: GORGEOUS_SWAGGER,
      label: "Gorgeous Swagger",
      icon: <ArrowLeftRightIcon size={20} />,
      path: "/",
    },
    {
      name: CRUD_GENERATOR,
      label: "CRUD Generator",
      icon: <CodeXmlIcon size={20} />,
      path: "/crud-generator",
    },
  ];
  const handleMenuItemClick = (itemName: string) => {
    const selectedItem = menuItems.find((item) => item.name === itemName);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };
  return (
    <div className="w-100 h-screen flex flex-col sticky top-0">
      <div className="w-full bg-gray-700 text-white flex-none flex flex-col">
        <div className="flex flex-col items-center m-2">
          <img src={imgSrc} className="w-80 rounded-lg" alt="Logo" />
        </div>
      </div>
      <div className="w-full bg-blue-900 text-white flex-grow flex flex-col">
        <nav className="flex-grow">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <div
                  className={`flex items-center p-3 m-2 rounded-lg cursor-pointer transition-colors ${
                    activeItem === item.name
                      ? "bg-blue-500"
                      : "hover:bg-blue-700"
                  }`}
                  onClick={() => handleMenuItemClick(item.name)}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
