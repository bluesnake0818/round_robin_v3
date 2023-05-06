import React from 'react'

// Styles
import classes from "./Styles/FormInput.module.css"

const FormInputArea = ({onValueChange}) => {

  return (
    <div>
      <h5>Enter text here:</h5>
      <textarea type="text" className={classes["input-area"]} onChange={onValueChange}/>
    </div>
  )
}

export default FormInputArea