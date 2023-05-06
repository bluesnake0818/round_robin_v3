// Styles
import styles from './Styles/Landing.module.css'

// components
import Spinner from '../../components/LandingComponents/Spinner'

// packages
import CookieConsent from "react-cookie-consent";

const Landing = () => {
  return (
    <main className={styles.container}>
      <Spinner /> 
      <CookieConsent
        location="bottom"
        buttonText="I Accept"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#999999", fontSize: '10px', display: 'flex', alignItems: 'center' }}
        buttonStyle={{ background: "#666666" , fontSize: "10px", color: "#ffffff" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
        We use cookies on our website. By continuing to browse, you agree to the storing of cookies on your device to enhance your site experience and for analytical purposes. 
      </CookieConsent>
    </main>
  )
}

export default Landing
