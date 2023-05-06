import React from 'react'

// Components
import FormInput from './FormInputText'
import GenerateAdButton from "./GenerateAdButton"

// Styles
import classes from "./Styles/Form.module.css"

const URLForm = () => {
  return (
    <form className={classes.form}>
        <div>
          <h1>Generate Ad Copies from URLs</h1>
          <p>WeAd will scrape the provided URLs for text information then we will generate an ad copy for you</p>
        </div>
        <div className={classes["url-input-container"]}>
          <FormInput label="Enter url here:"/>
          <FormInput label="Enter url here:"/>
          <FormInput label="Enter url here:"/>
        </div>
        <GenerateAdButton />
    </form>
  )
}

export default URLForm