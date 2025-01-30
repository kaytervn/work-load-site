import { BrowserRouter, Routes, Route } from "react-router-dom";
import GorgeousSwagger from "./views/GorgeousSwagger";
import CRUDGenerator from "./views/Tools/CRUDGenerator";
import NotFound from "./views/NotFound";
import Tools from "./views/Tools/Tools";
import {
  CRUD_GENERATOR,
  GORGEOUS_SWAGGER,
  QR_GENERATOR,
  SEQUENCE_ACTIVATOR,
  API_DOCS,
  TOOLS,
  GAMES,
  PERMISSIONS_GENERATOR,
  FIGHTING_GAME,
  MULTIROOM_PLATFORMER,
  THREE_D_RACING_GAME,
} from "./types/pageConfig";
import QrCodeGenerator from "./views/Tools/QrGenerator";
import SequenceActivator from "./views/Tools/SequenceActivator";
import APIDocs from "./views/Tools/APIDocs";
import Games from "./views/Other/Games";
import Permissions from "./views/Tools/Permissions";
import FightingGame from "./views/Other/FightingGame";
import MultiroomPlatformer from "./views/Other/MultiroomPlatformer";
import ThreeDRacingGame from "./views/Other/ThreeDRacingGame";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={GORGEOUS_SWAGGER.path} element={<GorgeousSwagger />} />
        <Route path={TOOLS.path} element={<Tools />} />
        <Route path={CRUD_GENERATOR.path} element={<CRUDGenerator />} />
        <Route path={QR_GENERATOR.path} element={<QrCodeGenerator />} />
        <Route path={SEQUENCE_ACTIVATOR.path} element={<SequenceActivator />} />
        <Route path={API_DOCS.path} element={<APIDocs />} />
        <Route path={GAMES.path} element={<Games />} />
        <Route path={PERMISSIONS_GENERATOR.path} element={<Permissions />} />
        <Route path={FIGHTING_GAME.path} element={<FightingGame />} />
        <Route path={THREE_D_RACING_GAME.path} element={<ThreeDRacingGame />} />
        <Route
          path={MULTIROOM_PLATFORMER.path}
          element={<MultiroomPlatformer />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
