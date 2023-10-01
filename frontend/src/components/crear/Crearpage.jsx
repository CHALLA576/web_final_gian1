import { useState } from "react";
import styles from "./crearpage.module.css";
import vinod from "./images/vinod.jpg";
import vadina from "./images/vadina.jpg";

const Crearpage = () => {
    const [showVinodDetails, setShowVinodDetails] = useState(false);
    const [showVadinaDetails, setShowVadinaDetails] = useState(false);

    return (
        <div className={styles.container}>
            <div 
                className={styles.card}
                onClick={() => setShowVinodDetails(!showVinodDetails)}
            >
                <img src={vinod} alt="Vinod" className={styles.image} />
                <div className={styles.tapSign}>Tap to view details</div>
                {showVinodDetails && (
                    <div className={styles.details}>
                        <p><strong>Name:</strong> Vinod Kumar</p>
                        <p><strong>Occupation:</strong> Civil Engineer</p>
                        <p><strong>Age:</strong> 27</p>

                        <p><strong>Qualification:</strong> B.Tech Civil Eng, Diploma Civil Eng</p>
                    </div>
                )}
            </div>

            <div 
                className={styles.card}
                onClick={() => setShowVadinaDetails(!showVadinaDetails)}
            >
                <img src={vadina} alt="Vadina" className={styles.image} />
                <div className={styles.tapSign}>Tap to view details</div>
                {showVadinaDetails && (
                    <div className={styles.details}>
                        <p><strong>Name:</strong> Sasikala </p>
                        <p><strong>Occupation:</strong> Teacher</p>
                        <p><strong>Age:</strong> 24</p>
                        <p><strong>Qualification:</strong> B.Tech</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Crearpage;
