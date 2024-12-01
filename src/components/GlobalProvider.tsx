import {
  createContext,
  SetStateAction,
  useContext,
  Dispatch,
  useState,
} from "react";
import { getRandomGif } from "../types/utils";

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
  const [isCollapsed, setIsCollapsed] = useState<any>(false);
  const [collapsedGroups, setCollapsedGroups] = useState<{
    [key: string]: boolean;
  }>({});

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
