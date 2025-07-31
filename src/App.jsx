import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatorPage from "./pages/CreatorPage"  // ⬅️ 別忘了這行！

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/creator" element={<CreatorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
