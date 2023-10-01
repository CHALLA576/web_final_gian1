import styles from "./Home.module.css"
import Home1 from "../Home/Home1"
import { useNavigate } from "react-router-dom"

import Gallery from "../Gallery/Gallery" 
import Feedback from "../feedback/Feedback"
import Fmaily from "../Family/Fmaily"
import Crearpage from "../crear/Crearpage"








const Home=()=>{
    let navigate = useNavigate()

  
    let Homedata=()=>{
        navigate('/Home1')

        
    }

    let Creardata=()=>{
       navigate('/Crearpage')
    }

    let logoutdata=()=>{
        navigate('/')

    }
    let contactdata=()=>{
            navigate('/Gallery')


    }
    let familydata=()=>{
        navigate('/Fmaily')
    }

    let Contactdata=()=>{
        navigate("/Feedback")
    }

    return(
        <div>
            <nav id={styles.nav} >
                <img src="" alt="" />
                <div className={styles.items} onClick={Homedata} >Home</div>
                <div className={styles.items} onClick={Creardata} >About</div>
                <div className={styles.items} onClick={contactdata} >Gallery</div>
                <div className={styles.items} onClick={familydata} >family</div>
                <div className={styles.items} onClick={Contactdata} > Contact</div>
                <div id={styles.logout} onClick={logoutdata} >Logout</div>
                

            </nav>
            <Home1/>
            <Crearpage/>
            <Gallery/>
            <Fmaily/>
            <Feedback/>
           

            


        </div>
    )
}
export default Home