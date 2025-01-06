import { HashRouter, Routes, Route } from "react-router-dom";
import GorgeousSwagger from "./views/GorgeousSwagger";
import CRUDGenerator from "./views/CRUDGenerator";
import NotFound from "./views/NotFound";
import DocumentTools from "./views/DocsTools/DocumentTools";
import {
  CRUD_GENERATOR,
  GORGEOUS_SWAGGER,
  DOCUMENT_TOOLS,
  QR_GENERATOR,
  SEQUENCE_ACTIVATOR,
  API_DOCS,
} from "./types/pageConfig";
import QrCodeGenerator from "./views/DocsTools/QrGenerator";
import SequenceActivator from "./views/DocsTools/SequenceActivator";
import APIDocs from "./views/DocsTools/APIDocs";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={GORGEOUS_SWAGGER.path} element={<GorgeousSwagger />} />
        <Route path={CRUD_GENERATOR.path} element={<CRUDGenerator />} />
        <Route path={DOCUMENT_TOOLS.path} element={<DocumentTools />} />
        <Route path={QR_GENERATOR.path} element={<QrCodeGenerator />} />
        <Route path={SEQUENCE_ACTIVATOR.path} element={<SequenceActivator />} />
        <Route path={API_DOCS.path} element={<APIDocs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
