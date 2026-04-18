import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Results from './pages/Results';
import History from './pages/History';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import BatchPredict from './pages/BatchPredict';
import Compare from './pages/Compare';
import ModelMetrics from './pages/ModelMetrics';
import Docs from './pages/Docs';
import Settings from './pages/Settings';
import GeneNetwork from './pages/GeneNetwork';
import GlobalInsights from './pages/GlobalInsights';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<div className="p-10 text-white">About MoA-XFormer</div>} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="predict" element={<Predict />} />
            <Route path="batch" element={<BatchPredict />} />
            <Route path="results" element={<Results />} />
            <Route path="compare" element={<Compare />} />
            <Route path="history" element={<History />} />
            <Route path="metrics" element={<ModelMetrics />} />
            <Route path="docs" element={<Docs />} />
            <Route path="settings" element={<Settings />} />
            <Route path="network" element={<GeneNetwork />} />
            <Route path="insights" element={<GlobalInsights />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
