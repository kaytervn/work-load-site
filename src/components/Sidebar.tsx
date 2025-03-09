import {
  ArrowLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FolderCodeIcon,
  ContainerIcon,
  Gamepad2,
  DraftingCompassIcon,
  RocketIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalProvider";
import { useEffect, useState } from "react";
import {
  GAMES,
  GORGEOUS_SWAGGER,
  SOCKET_CLIENT,
  TOOLS,
} from "../types/pageConfig";
import { getStorageData, setStorageData } from "../services/storages";
import { LOCAL_STORAGE } from "../types/constant";
import Breadcrumb from "./Breadcrumb";

const Sidebar = ({ activeItem, renderContent, breadcrumbs }: any) => {
  const {
    imgSrc,
    isCollapsed,
    setIsCollapsed,
    collapsedGroups,
    setCollapsedGroups,
  } = useGlobalContext();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const navigate = useNavigate();

  const menuGroups = [
    {
      name: "Development",
      icon: <FolderCodeIcon size={20} />,
      items: [
        {
          name: GORGEOUS_SWAGGER.name,
          label: GORGEOUS_SWAGGER.label,
          icon: <ArrowLeftRightIcon size={20} />,
          path: GORGEOUS_SWAGGER.path,
        },
        // {
        //   name: SOCKET_CLIENT.name,
        //   label: SOCKET_CLIENT.label,
        //   icon: <RocketIcon size={20} />,
        //   path: SOCKET_CLIENT.path,
        // },
        {
          name: TOOLS.name,
          label: TOOLS.label,
          icon: <DraftingCompassIcon size={20} />,
          path: TOOLS.path,
        },
      ],
    },
    {
      name: "Other",
      icon: <ContainerIcon size={20} />,
      items: [
        {
          name: GAMES.name,
          label: GAMES.label,
          icon: <Gamepad2 size={20} />,
          path: GAMES.path,
        },
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarVisible(false);
        setIsCollapsed(true);
      } else {
        setIsSidebarVisible(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuItemClick = (itemName: string) => {
    const selectedItem = menuGroups
      .flatMap((group) => group.items)
      .find((item) => item.name === itemName);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
    if (isMobile) {
      setIsSidebarVisible(false);
    }
  };

  useEffect(() => {
    setCollapsedGroups(getStorageData(LOCAL_STORAGE.COLLAPSED_GROUPS, {}));
  }, []);

  const toggleGroupCollapse = (groupName: string) => {
    setCollapsedGroups((prev) => {
      const updatedGroups = { ...prev, [groupName]: !prev[groupName] };
      getStorageData(LOCAL_STORAGE.COLLAPSED_GROUPS, updatedGroups);
      return updatedGroups;
    });
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarVisible(!isSidebarVisible);
    } else {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      setStorageData(LOCAL_STORAGE.IS_COLLAPSED, newCollapsed);
    }
  };

  return (
    <div className="flex min-h-screen">
      {isMobile && (
        <button
          className="fixed bottom-4 left-4 z-40 p-2 rounded-lg bg-blue-800 text-white"
          onClick={toggleSidebar}
        >
          <MenuIcon size={24} />
        </button>
      )}
      <div
        className={`
          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-20" : "w-[20rem]"}
          fixed left-0 top-0
          transition-all duration-300 ease-in-out
          h-screen
          z-40
          md:translate-x-0
          overflow-hidden
        `}
      >
        <div className="h-full flex flex-col bg-gray-900 text-white overflow-y-auto">
          <div className="flex flex-col items-center m-2">
            <img
              src={imgSrc}
              className={`${
                isCollapsed ? "w-16" : "w-[20rem]"
              } rounded-lg transition-all duration-300`}
            />
          </div>
          <nav className="flex-grow overflow-y-auto">
            {menuGroups.map((group) => (
              <div key={group.name} className="mb-2">
                <div
                  className="flex justify-between items-center p-3 mx-2 mb-2 bg-gray-800 cursor-pointer rounded-lg"
                  onClick={() => toggleGroupCollapse(group.name)}
                >
                  {group.icon}
                  {!isCollapsed && <span className="ml-2">{group.name}</span>}
                  {collapsedGroups[group.name] ? (
                    <ChevronDownIcon size={20} />
                  ) : (
                    <ChevronUpIcon size={20} />
                  )}
                </div>
                <ul>
                  {!collapsedGroups[group.name]
                    ? group.items.map((item) => (
                        <li key={item.name} className="mb-2">
                          <div
                            className={`flex items-center p-3 mx-2 rounded-lg cursor-pointer transition-colors
                            ${
                              activeItem === item.name
                                ? "bg-blue-500"
                                : "hover:bg-blue-700"
                            }
                            ${isCollapsed ? "justify-center" : ""}
                          `}
                            onClick={() => handleMenuItemClick(item.name)}
                          >
                            {item.icon}
                            {!isCollapsed && (
                              <span className="ml-2">{item.label}</span>
                            )}
                          </div>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            ))}
          </nav>
          <button
            className="flex items-center justify-center p-2 hover:bg-gray-700 transition-colors"
            onClick={toggleSidebar}
          >
            {isMobile ? (
              <XIcon size={24} className="text-gray-400" />
            ) : isCollapsed ? (
              <ChevronRightIcon size={24} className="text-gray-400" />
            ) : (
              <ChevronLeftIcon size={24} className="text-gray-400" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${
          isMobile ? "ml-0" : isCollapsed ? "ml-20" : "ml-[20rem]"
        }`}
      >
        <div className="min-h-screen flex flex-col bg-gray-800">
          <div className="p-4 border-b-2 border-gray-700">
            <Breadcrumb items={breadcrumbs} />
          </div>
          <div className="p-4 flex-1 overflow-auto">{renderContent}</div>
        </div>
        {/* <div className="p-6 min-h-screen bg-gray-800">{renderContent}</div> */}
      </div>
      {isMobile && isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarVisible(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
