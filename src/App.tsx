import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Ocorrencias from "./pages/Ocorrencias";
import Dashboard from "./pages/Dashboard";
import Correcao from "./pages/Correcao";
import Dashboard2 from "./pages/Dashboard2";
import "@arcgis/core/assets/esri/themes/light/main.css";
// import { TreeDataProvider } from "./utils/TreeDataContext";

function App() {
  return (
    <Router>
      {/* <TreeDataProvider> */}
      <div className="flex flex-col h-screen">
        <div>
          <Navbar />
        </div>
        <div className="flex-grow overflow-y-auto">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard2" element={<Dashboard2 />} />
            <Route path="/correcao" element={<Correcao />} />
          </Routes>
        </div>
        <div className="p-6">
          <Footer />
        </div>
      </div>
      {/* </TreeDataProvider> */}
    </Router>
  );
}

export default App;
