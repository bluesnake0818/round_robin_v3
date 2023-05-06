// packages
import React from 'react'

// styles
import classes from './Styles/SpinnerLanding.module.css'

// components 
import Nav from './Nav'


function Spinner() {

  return (
    <div className={classes['landing-spinner-zone']}>
      <div className={classes['landing-spinnerTextArea']}>
        <div>
          <text className={classes.title}>WeAd</text>
          <Nav />
        </div>
      </div>
    </div>
  )
}

export default Spinner

