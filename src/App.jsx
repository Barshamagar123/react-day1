import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import AdmissionForm from './Component/Admissionform';

function App() {
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show form after 2 seconds on every visit (no localStorage check)
    const timer = setTimeout(() => {
      setShowAdmissionForm(true);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleCloseForm = () => {
    setShowAdmissionForm(false);
  };

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        
        {/* Show AdmissionForm modal every time */}
        {showAdmissionForm && (
          <AdmissionForm 
            onClose={handleCloseForm} 
            firstVisit={true} 
          />
        )}

        {/* Always render routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;