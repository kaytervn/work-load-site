import { BrowserRouter, Routes, Route } from "react-router-dom";
import GorgeousSwagger from "./views/GorgeousSwagger";
import CRUDGenerator from "./views/CRUDGenerator";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GorgeousSwagger />} />
        <Route path="/crud-generator" element={<CRUDGenerator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
