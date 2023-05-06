import React from 'react'


// Hooks
import useForm from "../Util/Hooks/useForm"
import { useNavigate } from 'react-router-dom'

// Components
import FormInputArea from './FormInputArea'
import GenerateAdButton from './GenerateAdButton'

// Styles
import classes from './Styles/Form.module.css'

const DocumentForm = () => {
  const {value, onValueChange} = useForm()

  const navigate = useNavigate()

  const onDocumentSubmit = (e) => {
    e.preventDefault()

    if(value.trim().length === 0) {
      return;
    }
    
    navigate('/analysis', {state: {text: value}})
  }
  
  return (
    <form className={classes.form} onSubmit={onDocumentSubmit}>
        <div>
          <h1>Generate Ad Copies from Text</h1>
          <p>WeAd will analyze the provided text then we will generate an ad copy for you</p>
        </div>
        <div className={classes["url-input-container"]}>
        <FormInputArea label="Enter text here:" onValueChange={onValueChange}/>
        </div>
        <GenerateAdButton />
    </form>
  )
}

export default DocumentForm