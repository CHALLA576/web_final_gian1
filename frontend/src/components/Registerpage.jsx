import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import style2 from "./Register.module.css"




const Register = ()=>{
    let [name,setName] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [phonno,setPhonno] = useState("")
    let namedata=(e)=>{
        setName(e.target.value)

    }
    let emaildata=(e)=>{
        setEmail(e.target.value)

    }
    let passworddata=(e)=>{
        setPassword(e.target.value)

    }
    let phonnodata=(e)=>{
        setPhonno(e.target.value)

    }

    let formhandling=(e)=>{
        e.preventDefault()
        let payload = {name,email,password,phonno}
        axios.post('http://localhost:5000/register',payload)
        .then((response)=>{
            alert(response.data.message)
        })
        .catch(()=>{
            alert('data is not posted')
        })


    }

    return(
        <div id={style2.register_main}>

        
            <form id={style2.register_sub}>
            <br /> <br />
            <label className={style2.label} htmlFor=""> Name</label> <br /> <br />
            <input className={style2.input} type="text" value={name} onChange={namedata} /> <br /> <br /> <br />

            <label className={style2.label} htmlFor="">Email</label> <br /> <br />
            <input className={style2.input} type="text" value={email} onChange={emaildata} /> <br /> <br /><br />

            <label  className={style2.label} htmlFor="">Password</label> <br /> <br />
            <input className={style2.input} type="text" value={password} onChange={passworddata} /> <br /> <br /> <br />

            <label className={style2.label}  htmlFor="">Phonno</label> <br /> <br />
            <input className={style2.input} type="text" value={phonno} onChange={phonnodata} /> <br /> <br /> <br />

            <input  className={style2.input2} type="submit" onClick={formhandling} /> <br /> <br /> <br /> <br />
            <Link  className={style2.link} to = "/" >Click To Home Page</Link>

            </form>
        </div>
    )
}

export default Register