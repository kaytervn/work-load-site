import { BrowserRouter, Routes, Route } from "react-router-dom";
import GorgeousSwagger from "./views/GorgeousSwagger";
import CRUDGenerator from "./views/CRUDGenerator";
import NotFound from "./views/NotFound";
import SequenceActivator from "./views/SequenceActivator";
import {
  CRUD_GENERATOR,
  GORGEOUS_SWAGGER,
  SEQUENCE_ACTIVATOR,
} from "./types/pageConfig";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={GORGEOUS_SWAGGER.path} element={<GorgeousSwagger />} />
        <Route path={CRUD_GENERATOR.path} element={<CRUDGenerator />} />
        <Route path={SEQUENCE_ACTIVATOR.path} element={<SequenceActivator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
