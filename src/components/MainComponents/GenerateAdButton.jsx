import React from 'react'

// Components
import { Button } from 'react-bootstrap'

// Styles
import classes from "./Styles/GenerateAdButton.module.css"

const GenerateAdButton = () => {
  return <Button type='submit' className={classes["ad-button"]}>Generate Ads</Button>
}

export default GenerateAdButton