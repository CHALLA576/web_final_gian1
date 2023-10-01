import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import style from  "./Login.module.css"


import  "./Navbar/Home"




const Login = ()=>{

    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let navigator = useNavigate()


    let emaildata=(e)=>{
        setEmail(e.target.value)

    }
    let passworddata=(e)=>{
        setPassword(e.target.value)

    }


    let formhandling=(e)=>{
        e.preventDefault()
        let payload = {email,password}
        axios.post('http://localhost:5000/login',payload)
        .then((response)=>{
            if(response){
                alert(response.data.message)
                if(response.data.status === 200){
                    navigator("/Home")

                }
            }
            else{
                console.log("data not posted");
            }
            
        })
       
        
    }

    return(
        <div id={style.main} >

        <form id={style.sub}>
        <h1 id={style.sign}>Sign in</h1>
        <br />
        <label className={style.label}  htmlFor=""> Email:</label> <br /><br />
        <input className={style.input}  type="text" value={email} onChange={emaildata} /> <br /><br />
        <br />
        <label className={style.label} htmlFor="">password:</label> <br /> <br /> 
        <input className={style.input} type="text" value={password} onChange={passworddata} /> <br />  <br />  <br />


        <input  id={style.button} type="submit" onClick={formhandling} /> <br /> <br />  <br /> <br />
        <Link id={style.link} to="/register"> Click to Register</Link>
        </form>
    
        </div>
    )
}

export default Login