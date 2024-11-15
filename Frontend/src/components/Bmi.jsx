import React, { useState } from 'react';
import '../assets/css/header.css';
import '../assets/css/bmi.css';
import BmiImage from '../assets/images/bmi2.png';

export default function Bmi() {
  // State to store weight, height, BMI result, and info
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState('');
  const [bmiInfo, setBmiInfo] = useState('');

  // Function to calculate BMI and determine category
  const calculateBmi = () => {
    const weightNum = parseFloat(weight);
    const heightNumCm = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNumCm) || heightNumCm <= 0) {
      setBmiResult('Invalid input');
      setBmiInfo('');
      return;
    }

    const heightInMeters = heightNumCm / 100; // Convert height from cm to meters
    const bmi = (weightNum / (heightInMeters * heightInMeters)).toFixed(2); // Calculate BMI
    setBmiResult(bmi);

    // Determine BMI category
    let info = '';
    if (bmi < 18.5) {
      info = 'Under 18.5 – This is described as underweight.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      info = "Between 18.5 and 24.9 – This is described as the 'healthy range'.";
    } else if (bmi >= 25 && bmi <= 29.9) {
      info = 'Between 25 and 29.9 – This is described as overweight.';
    } else if (bmi >= 30 && bmi <= 39.9) {
      info = 'Between 30 and 39.9 – This is described as obesity.';
    } else {
      info = '40 or over – This is described as severe obesity.';
    }

    setBmiInfo(info);
  };

  return (
    <section className="bmi-section spad">
      <div className="container custom-container">
        <div className="row align-items-center">
          {/* Background Image */}
          <div className="col-lg-6 col-md-12 bmi-image-container">
            <img src={BmiImage} alt="BMI Background" className="bmi-image" />
          </div>

          {/* Calculator Section */}
          <div className="col-lg-6 col-md-12">
            <div className="section-title mb-0">
              <h2 className="cal">
                Calculate your <span>BMI</span>
              </h2>
            </div>
            <div className="bmi-calculator-warp">
              <div className="bmi-calculator">
                {/* Form Content */}
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      placeholder="Weight (KG)"
                      id="bmi-weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      placeholder="Height (CM)"
                      id="bmi-height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <button className="site-btn" id="bmi-submit" onClick={calculateBmi}>
                      Calculate
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <input type="text" id="bmi-result" value={bmiResult} readOnly />
                  </div>
                </div>
                {/* BMI Info Section */}
                <p className="bmi-category">{bmiInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
