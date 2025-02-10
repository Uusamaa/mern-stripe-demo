import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PricingPage from './PricingPage.tsx';
import Success from './Success.tsx';
import Cancel from './Cancel.tsx';

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
