import React from 'react'

// Components

import URLForm from '../../components/MainComponents/URLForm'
import DocumentForm from '../../components/MainComponents/DocumentForm'
import Title from "../../components/UI/Title"

// Styles
import styles from './Styles/Main.module.css'

const Main = () => {
  return (
    <div className={styles.container}>
      <Title />
      <div className={styles["form-container"]}>
        <DocumentForm />
        <URLForm />
      </div>
    </div>
  )
}

export default Main
