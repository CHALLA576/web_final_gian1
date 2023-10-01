import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './family.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

function Fmaily() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]); // renamed for clarity
    const [familyMember, setFamilyMember] = useState("");

    useEffect(() => {
        const fetchUploadedFamilyImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/family/images');
                setUploadedImages(response.data); // adjust here
            } catch (error) {
                console.error("Error fetching the family images:", error);
            }
        };
        fetchUploadedFamilyImages();
    }, []);

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const onUpload = async () => {
        const formData = new FormData();
        formData.append('familyImage', selectedFile);
        formData.append('familyMember', familyMember);

        try {
            const response = await axios.post('http://localhost:5000/family/upload', formData);
            setUploadedImages(prevImages => [...prevImages, { url: response.data, familyMember }]); // adjust here
        } catch (error) {
            console.error("Error uploading the family image:", error);
        }
    };

    useEffect(() => {
        if (selectedFile) {
            onUpload();
        }
    }, [selectedFile]);

    return (
        <div className={styles.main}>
            <div className={styles.uploadedimages}>
                {uploadedImages.map((image, index) => ( // adjust here
                    <div key={index} className={styles.imageContainer}>
                        <img src={image.url} alt={`Uploaded ${index}`} className={styles.img} />
                        <p className={styles.familyMemberName}>{image.familyMember}</p>
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                placeholder="Enter family member's name"
                value={familyMember}
                onChange={(e) => setFamilyMember(e.target.value)}
                className={styles.familyMemberInput}
            />
            <label className={styles.uploadIcon} htmlFor="familyFileInput">
                <FontAwesomeIcon icon={faCloudUploadAlt}  size="6x" />
            </label>
            <h1>Click to Upload Family Images</h1>
            <input 
                type="file" 
                id="familyFileInput" 
                onChange={onFileChange} 
                className={styles.hiddenInput}
            />
        </div>
    );
}

export default Fmaily;
