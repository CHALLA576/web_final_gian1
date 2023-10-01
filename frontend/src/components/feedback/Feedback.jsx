import axios from "axios"
import { useState } from "react"
import style from "./feedback.module.css"
import koti from "./WhatsApp Image 2023-09-30 at 22.25.08.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Feedback = ()=>{
    let [name, setName ] = useState("")
    let [email, setEmail] = useState("")
    let [feedback,setFeedback] = useState("")
    let [phonNo,setPhonNO] = useState("")

    let namedata=(e)=>{
        setName(e.target.value)

    }

    let emaildata=(e)=>{
        setEmail(e.target.value)

    }

    let feedbackdata=(e)=>{
        setFeedback(e.target.value)

    }
    let phonnodata=(e)=>{
        setPhonNO(e.target.value)
    }
    const formhandling=()=>{
       let payload = {name,email,feedback,phonNo}
        axios.post('http://localhost:5000/feedback', payload)
        .then((Response)=>{
            if(Response){
                alert(Response.data.message)
            }
            else{
                console.log('data is not posted');
            }
        })
    }


    return(
        <div id={style.feedmain}>
            <div id={style.main}>
                
                <form id={style.sub}>

                    <h1>your feedback is very importent to us!</h1>
                    <br />
                    <br />
                    <label htmlFor="">Name :</label> <br />
                    <input type="text" value={name} onChange={namedata} /> <br />
                    <label htmlFor="">Email :</label> <br />
                    <input type='text' value={email} onChange={emaildata} /> <br />
                    <label htmlFor="">fedback :</label> <br />
                    <input type="text" value={feedback} onChange={feedbackdata} /> <br />
                    <label htmlFor="">Phono :</label> <br />
                    <input type="text" value={phonNo} onChange={phonnodata} /> <br />
                    <button onClick={formhandling}>submit</button>
                </form>


            </div>
            
            <div id={style.contact}>

                <h1>Contact our web desiginer</h1>
                <br />
                <img  src={koti} alt="koti" />




            </div>

                <div id={style.footer}>
                    <p>Follow us on:</p>
                        <FontAwesomeIcon icon={faInstagram} id={style.icon} />
                        
                        <p>ishmart_ishwar9</p>
                        <FontAwesomeIcon icon={faFacebook} id={style.icon} />
                        
                        <p>challa koteswararao</p>
                        <FontAwesomeIcon icon={faTwitter} id={style.icon} />
                        
                        <p>ishwar@123</p>
                        <FontAwesomeIcon icon={faPhone} id={style.icon} />
                        
                        <p>9505561495</p>
                        <FontAwesomeIcon icon={faEnvelope} id={style.icon} />
                        <p>kkoti576@gmail.com</p>
                    <p>© 2023 Your Company Name</p>
                </div>

       
        </div>
    )
}

export default Feedback