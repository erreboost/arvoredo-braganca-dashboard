import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Ocorrencias from './pages/Ocorrencias';
import Dashboard from './pages/Dashboard';
import Correcao from './pages/Correcao';
import '@arcgis/core/assets/esri/themes/light/main.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/correcao" element={<Correcao />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
