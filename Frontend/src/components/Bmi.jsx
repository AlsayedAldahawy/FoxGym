import React from 'react';
import '../assets/css/header.css';
import '../assets/css/bmi.css';
import BmiImage from '../assets/images/bmi-bg.jpg';

export default function Bmi() {
  return (
    <section className="bmi-section spad">
      <div className="container custom-container">
      <div className="row align-items-center">
        {/* Background Image */}
        <div className="col-lg-6 col-md-12 bmi-image-container">
          <img
            src={BmiImage}
            alt="BMI Background"
            className="bmi-image"
          />
        </div>

        
        {/* Calculator Section */}
        <div className="col-lg-6 col-md-12">
          <div className="section-title mb-0">
            <h2 className='cal'>
              Calculate your <span>BMI</span>
            </h2>
            
          </div>
          <div className="bmi-calculator-warp">
            <div className="bmi-calculator">
              {/* Form Content */}
              <div className="row">
                <div className="col-sm-6">
                  <input type="text" placeholder="Weight (KG)" id="bmi-weight" />
                </div>
                <div className="col-sm-6">
                  <input type="text" placeholder="Height (M)" id="bmi-height" />
                </div>
                <div className="col-sm-6">
                  <button className="site-btn" id="bmi-submit">Calculate</button>
                </div>
                <div className="col-sm-6">
                  <input type="text" id="bmi-result" readOnly />
                </div>
              </div>
              <p>
                Vivamus libero mauris, bibendum eget sapien ac, ultrices rhoncus ipsum nec sapien.
              </p>
            </div>
          </div>
        </div>
      </div>

      </div>
    </section>
  );
}
