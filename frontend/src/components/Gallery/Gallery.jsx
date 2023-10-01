import React from "react";
import style  from "../Gallery/gallery.module.css"


import gallery5 from "../Gallery/scrooll/gallery5.jpg"

import gallery7 from "../Gallery/scrooll/gallery7.jpg"
import gallery8 from "../Gallery/scrooll/gallery8.jpg"
import gallery9 from "../Gallery/scrooll/gallery9.jpg"


import App1 from "../Imagemongodb/App1";







const Gallery=()=>{


    return(
        <div id={style.main}>
            <h1>Gallery</h1>
                <div id={style.scrollimges}>


                    <img className={style.img} src={gallery5} alt="gallery5" />

                    <img className={style.img} src={gallery7} alt="gallery7" />
                    <img className={style.img} src={gallery8} alt="gallery8" />
                    <img className={style.img} src={gallery9} alt="gallery9" />

                   

                   




                </div>
                <div>
                    <App1/>
                </div>

        </div>
    )
}
export default Gallery;


