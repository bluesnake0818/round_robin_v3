import React from 'react'

// Styles
import classes from "./Styles/FormInput.module.css"

const FormInputText = ({onValueChange}) => {
  return (
    <div>
      <h5>Enter URL here:</h5>
      <input type="text" className={classes["input-text"]} onChange={onValueChange}/>
    </div>
  )
}

export default FormInputText