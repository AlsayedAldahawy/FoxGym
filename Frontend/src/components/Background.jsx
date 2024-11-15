import React, { useState, useEffect } from 'react';
import image1 from '../assets/images/cover1.jpg';
import image2 from '../assets/images/cover2.jpg';
import image3 from '../assets/images/cover3.jpg';
import image4 from '../assets/images/cover4.jpg';
import image5 from '../assets/images/cover5.jpg';
import '../assets/css/header.css';


const Background = () => {
    const images = [image1, image2, image3, image4, image5];
    const [currentImage, setCurrentImage] = useState(images[0]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setCurrentImage(randomImage);
      }, 10000);
      return () => clearInterval(interval);
    }, [images]);
  
    return (
      <div className="background">
        <img src={currentImage} alt="Background" className="background-image" />
        <div className="background-overlay"></div>
      </div>
    );
  };
  
  export default Background;