import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import ExploreProperties from './pages/ExploreProperties';
import PropertyDetails from './pages/PropertyDetails';
import SavedProperties from './pages/SavedProperties';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Dedicated wrapper for Buy / Rent shortcuts
function BuyRedirect() {
  return <Navigate to="/explore?status=for-sale" replace />;
}

function RentRedirect() {
  return <Navigate to="/explore?status=for-rent" replace />;
}

export default function App() {
  return (
    <PropertyProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-offwhite text-charcoal font-sans selection:bg-sage-200 selection:text-sage-900">
          {/* Global Sticky Navbar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<ExploreProperties />} />
              <Route path="/buy" element={<BuyRedirect />} />
              <Route path="/rent" element={<RentRedirect />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/saved" element={<SavedProperties />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Global Toast Notifications */}
          <Toast />
        </div>
      </BrowserRouter>
    </PropertyProvider>
  );
}

