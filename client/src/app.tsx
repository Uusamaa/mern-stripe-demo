import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PricingPage from './pages/PricingPage/PricingPage.tsx';
import Cancel from './pages/Cancel.tsx';
import Success from './pages/Success.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PricingPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
};

export default App;
