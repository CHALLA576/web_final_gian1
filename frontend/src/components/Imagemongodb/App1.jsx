import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles1 from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

function App1() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  useEffect(() => {
    // Fetch previously uploaded images when the component is loaded
    const fetchUploadedImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/images');
        setUploadedImageUrls(response.data);
      } catch (error) {
        console.error("Error fetching the images:", error);
      }
    };

    fetchUploadedImages();
  }, []);

  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      // Append the newly uploaded image URL to our list
      setUploadedImageUrls([...uploadedImageUrls, response.data]);
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      onUpload();
    }
  }, [selectedFile]);

  return (
    <div id={styles1.main}>
      <div id={styles1.uploadedimages}>
        {uploadedImageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} id={styles1.img} />
        ))}
      </div>
     
      <label id={styles1.uploadIcon} htmlFor="fileInput">
        <FontAwesomeIcon icon={faCloudUploadAlt}  size="6x" />

      </label>
      <h1>Click to Upload images</h1>
      <input 
        type="file" 
        id="fileInput" 
        onChange={onFileChange} 
        className={styles1.hiddenInput}
      />
    </div>
  );
}

export default App1;
