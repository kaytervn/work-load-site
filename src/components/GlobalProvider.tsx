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
}>({
  imgSrc: null,
  setImgSrc: () => {},
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export const GlobalProvider = ({ children }: any) => {
  const [imgSrc, setImgSrc] = useState<any>(getRandomGif());
  const [isCollapsed, setIsCollapsed] = useState<any>(false);

  return (
    <GlobalContext.Provider
      value={{ imgSrc, setImgSrc, isCollapsed, setIsCollapsed }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
