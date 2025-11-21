import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LocationPage from './pages/LocationPage';
import MerchantListPage from './pages/MerchantListPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/merchants" element={<MerchantListPage />} />
          {/* More routes will be added as we build features */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
