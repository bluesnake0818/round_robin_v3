// Packages
import React from 'react'
import { Routes, Route,  } from 'react-router-dom'

// import {Helmet} from "react-helmet";


// Pages
import Landing from './pages/LandingPage/Landing'

// Styles
import styles from './App.module.css'
import Main from './pages/MainPage/Main'

const App = () => {

  return (
    <>
      <video autoPlay loop muted className={styles.video}>
        <source src='/background.mp4' type='video/mp4' />
      </video>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </>
  )
}

export default App
