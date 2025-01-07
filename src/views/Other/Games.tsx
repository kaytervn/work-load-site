import { useEffect } from "react";
import { GAMES } from "../../types/pageConfig";
import Sidebar from "../../components/Sidebar";

const Games = () => {
  useEffect(() => {
    document.title = GAMES.label;
  }, []);
  return <Sidebar activeItem={GAMES.name} renderContent={<>GAMES</>} />;
};

export default Games;
