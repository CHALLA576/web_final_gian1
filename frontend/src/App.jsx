import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "./components/Loginpage";
import Register from "./components/Registerpage";
import Home from "./components/Navbar/Home";
import Home1 from "./components/Home/Home1";
import Gallery from "./components/Gallery/Gallery";
import Feedback from "./components/feedback/Feedback";
import App1 from "./components/Imagemongodb/App1";
import Crearpage  from "./components/crear/Crearpage"
import Fmaily from "./components/Family/Fmaily";






const App=()=>{
    return(

        <div>

            <BrowserRouter>
            <Routes>

                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Login/>} />
                <Route path="/Home" element={<Home/>} />
                <Route path="/Home1" element={<Home1/>}/>
                <Route path="/Gallery" element = {<Gallery/>} />
                <Route path= "/Crearpage" element = {<Crearpage/>} />
                <Route path="/feedback" element = {<Feedback/>} />
                <Route path="/upload" element= {<App1/>} />
                <Route path = "/images" element = {<App1/>} />
                <Route path="/family/upload" element = {< Fmaily/>} />
                <Route path="/family/images" element =  {<Fmaily/>} />
                <Route path ="/Fmaily" element= {<Fmaily/>} />
                
            </Routes>
            </BrowserRouter>
          
        </div>
    )
}
export default App