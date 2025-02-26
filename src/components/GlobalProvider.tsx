import {
  createContext,
  SetStateAction,
  useContext,
  Dispatch,
  useState,
  useEffect,
} from "react";
import { getRandomGif } from "../types/utils";
import { getStorageData, setStorageData } from "../services/storages";
import { LOCAL_STORAGE } from "../types/constant";

const GlobalContext = createContext<{
  imgSrc: any;
  setImgSrc: Dispatch<SetStateAction<any>>;
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
  collapsedGroups: {
    [key: string]: boolean;
  };
  setCollapsedGroups: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >;
}>({
  imgSrc: null,
  setImgSrc: () => {},
  isCollapsed: false,
  setIsCollapsed: () => {},
  collapsedGroups: {},
  setCollapsedGroups: () => {},
});

export const GlobalProvider = ({ children }: any) => {
  const [imgSrc, setImgSrc] = useState<any>(getRandomGif());
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    getStorageData(LOCAL_STORAGE.IS_COLLAPSED, false)
  );
  const [collapsedGroups, setCollapsedGroups] = useState<{
    [key: string]: boolean;
  }>(getStorageData(LOCAL_STORAGE.COLLAPSED_GROUPS, {}));

  useEffect(() => {
    setStorageData(LOCAL_STORAGE.IS_COLLAPSED, isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    setStorageData(LOCAL_STORAGE.COLLAPSED_GROUPS, collapsedGroups);
  }, [collapsedGroups]);

  return (
    <GlobalContext.Provider
      value={{
        imgSrc,
        setImgSrc,
        isCollapsed,
        setIsCollapsed,
        collapsedGroups,
        setCollapsedGroups,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
