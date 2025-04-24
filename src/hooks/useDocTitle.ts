import { useEffect } from "react";

const useDocTitle = () => {
  useEffect(() => {
    document.title = "MSA";
  }, []);
};

export default useDocTitle;
