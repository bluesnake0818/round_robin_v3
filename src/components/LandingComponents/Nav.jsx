import React from 'react'

// Components
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

// Styles
import classes from "./Styles/Nav.module.css"

const Nav = () => {
  return (
    <Link to="/app"><Button variant='dark' size='lg' className={classes["nav-button"]}>Lets Get Started</Button></Link>
  )
}

export default Nav