// Packages
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Input from './pages/Input/Input'
import Output from './pages/Output/Output'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/output" element={<Output />} />
      </Routes>
    </>
  )
}

export default App
