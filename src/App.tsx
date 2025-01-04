import { HashRouter, Routes, Route } from "react-router-dom";
import GorgeousSwagger from "./views/GorgeousSwagger";
import CRUDGenerator from "./views/CRUDGenerator";
import NotFound from "./views/NotFound";
import DocumentTools from "./views/DocsTools/DocumentTools";
import {
  CRUD_GENERATOR,
  GORGEOUS_SWAGGER,
  DOCUMENT_TOOLS,
} from "./types/pageConfig";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={GORGEOUS_SWAGGER.path} element={<GorgeousSwagger />} />
        <Route path={CRUD_GENERATOR.path} element={<CRUDGenerator />} />
        {/* <Route path={DOCUMENT_TOOLS.path} element={<DocumentTools />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
