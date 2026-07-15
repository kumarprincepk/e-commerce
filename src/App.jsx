import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListingPage from './pages/ListingPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/product/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
