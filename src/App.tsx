import { BrowserRouter, Routes, Route } from "react-router-dom";
import GorgeousSwagger from "./views/GorgeousSwagger";
import CRUDGenerator from "./views/CRUDGenerator";
import {  getRandomGif } from "./types/utils";
import Sidebar from "./components/Sidebar";
import { CRUD_GENERATOR, GORGEOUS_SWAGGER } from "./types/constant";

const App = () => {
  const imgSrc = getRandomGif();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GorgeousSwagger
              sidebar={
                <Sidebar imgSrc={imgSrc} activeItem={GORGEOUS_SWAGGER} />
              }
            />
          }
        />
        <Route
          path="/crud-generator"
          element={
            <CRUDGenerator
              sidebar={<Sidebar imgSrc={imgSrc} activeItem={CRUD_GENERATOR} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
