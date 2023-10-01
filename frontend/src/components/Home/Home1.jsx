import styles from "./Home1.module.css"
import  "../Navbar/Home";
import audio from "../Audio/Na-Roja-Nuvve.mp3"
import { useRef } from "react"
import icon from "../Home/s (3).png"
const Home1=()=>{

    const AudioRef = useRef(null)
    const Aduioex=()=>{
        if(AudioRef.current){
            AudioRef.current.play()
        }

    }

    const Mouseleve = ()=>{
        if(AudioRef.current){
            AudioRef.current.pause()
            AudioRef.current.currentTime = 0
        }
    }
    return(
       
       <div>
             <div id={styles.con} onMouseEnter={Aduioex} onMouseLeave={Mouseleve} >
                <audio src={audio} ref={AudioRef} ></audio>

                <img id = {styles.img2} src={icon} alt="img2" />


            
            </div>
         
       </div>

    )
}
export default Home1