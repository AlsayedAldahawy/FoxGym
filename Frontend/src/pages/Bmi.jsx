import React, { useState } from "react";
import "../assets/css/header.css";
import "../assets/css/bmi.css";
import BmiImage from "../assets/images/backgrounds/bg_bmi.jpg";

export default function Bmi() {
  // State to store weight, height, BMI result, and info
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBmiResult] = useState("");
  const [bmiInfo, setBmiInfo] = useState("");

  // Function to calculate BMI and determine category
  const calculateBmi = (e) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNumCm = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNumCm) || heightNumCm <= 0) {
      setBmiResult("Invalid input");
      setBmiInfo("");
      return;
    }

    const heightInMeters = heightNumCm / 100; // Convert height from cm to meters
    const bmi = (weightNum / (heightInMeters * heightInMeters)).toFixed(2); // Calculate BMI
    setBmiResult(bmi);

    // Determine BMI category
    let info = "";
    if (bmi < 18.5) {
      info = "Under 18.5 – This is described as underweight.";
    } else if (bmi >= 18.5 && bmi < 25) {
      info =
        "Between 18.5 and 24.9 – This is described as the 'healthy range'.";
    } else if (bmi >= 25 && bmi < 30) {
      info = "Between 25 and 29.9 – This is described as overweight.";
    } else if (bmi >= 30 && bmi < 40) {
      info = "Between 30 and 39.9 – This is described as obesity.";
    } else {
      info = "40 or over – This is described as severe obesity.";
    }

    setBmiInfo(info);
  };

  const getBmiColor = (bmi) => {
    if (bmi < 18.5) return "blue";
    if (bmi >= 18.5 && bmi < 25) return "green";
    if (bmi >= 25 && bmi < 30) return "orange";
    if (bmi >= 30 && bmi < 40) return "red";
    if (bmi >= 40) return "purple";
    return "black";
    // Default color for invalid input or other cases
  };

  return (
    <section>
      <div className="background">
        <img src={BmiImage} alt="" />
        <div className="bg-shadow"></div>
      </div>

      <div
        className="form-container"
        style={{ transform: "translate(0, 40%)" }}
      >
        <form>
          <div style={{ justifyItems: "center" }}>
            <svg
            className="bmi-icon"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              width={100}
              viewBox="0 0 256 256"
              enable-background="new 0 0 256 256"
              xml:space="preserve"
            >
              <metadata>
                {" "}
                Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
              </metadata>
              <g>
                <g>
                  <g>
                    <path
                      fill="#ed563b"
                      d="M204.2,10.4c-0.4,0.5-0.6,9.7-0.8,26.1c-0.3,27.7-0.3,28.2-3.3,36c-2.1,5.4-6,11.3-10.6,15.8c-3.4,3.4-3.9,3.7-5.3,3.4c-0.9-0.2-4.7-0.5-8.6-0.6c-8.8-0.4-13.4,0.4-22.8,3.9c-5.7,2.1-13.6,4-16.9,4c-0.8,0-0.9-0.6-0.9-6v-6l3.4-0.4c21.2-2.3,40.5-17.8,46.9-38c2.3-7.1,3.5-15.7,2.6-18.1c-0.5-1.2-0.6-1.2-5.6-0.9c-20,1.1-38.9,14.4-46.9,32.8c-1,2.1-1.8,3.7-2,3.5c-0.1-0.2-0.7-2-1.4-3.9c-2.5-7.8-10.4-20.3-14.2-22.4c-1.2-0.7-1.4-0.7-2.4,0.2c-0.6,0.6-1.1,1.3-1.1,1.7c0,0.4,1.3,2.2,2.9,4.1c5.8,6.8,9.2,13.3,11.5,22.3c1.2,4.4,1.3,5.9,1.5,18l0.3,13.2l-1.9-0.3c-4.7-0.7-9.8-2-13.8-3.5c-7.2-2.9-11.6-3.8-19.4-4.1c-10.7-0.4-19.2,1.7-28,6.6c-8.6,4.8-18.4,14.2-24.7,23.6l-2.5,3.8l-10.7,0.3c-11.9,0.3-13.1,0.6-16.4,4.3c-3.1,3.5-3,3.1-3.1,27.6c-0.1,24.8-0.2,23.7,3.4,27.1c3.3,3.2,4.7,3.6,12.2,3.9l6.8,0.3l1.7,4.9c7.8,23.4,25.1,41.6,46.7,49.2c8.3,2.9,13.7,3.8,23.8,3.8c10.1,0,14.8-0.8,23.2-3.8c2.5-0.9,5-1.6,5.5-1.6c0.6,0,3.3,0.8,6.2,1.8c7.7,2.7,13,3.5,22.8,3.5c12.3,0,20.8-2,32.1-7.5l5.6-2.8h12.8c10.9,0,12.9-0.1,13.5-0.8c1-1.1,0.4-10.9-1.1-18.1l-1.1-5.7l3.3-6.7c5.4-10.9,7.9-20.1,8.9-32.1c1.4-17.5-3.4-36.9-12.9-51.6c-1.2-1.9-2.2-3.5-2.2-3.7c0-0.3,8.6-10.9,9.2-11.3c0.3-0.2,1.1-1.6,1.8-3c2.8-5.6,6.2-11.8,6.9-12.6c0.4-0.4,0.7-1.2,0.7-1.7c0-0.9,2.8-10.2,4.1-13.6c0.3-0.9,0.6-2.4,0.7-3.5c0.1-1.1,0.4-4.1,0.8-6.5c0.9-6.2,0.8-53.5-0.1-54.5C244.5,9.5,205,9.4,204.2,10.4z M241.3,19.1v4.8h-8.5c-6.8,0-8.7,0.2-9.6,0.8c-1.3,0.9-1.4,2.1-0.3,3.3c0.7,0.8,1.7,0.9,9.6,0.9h8.7v4.8v4.8h-3.4c-4.9,0-7,1.8-4.8,4.1c0.7,0.7,1.6,0.9,4.5,0.9h3.7v4.8v4.8h-8.7c-7.3,0-8.8,0.2-9.6,0.9c-1.2,1.1-1.2,2.5,0.2,3.4c0.9,0.7,2.8,0.8,9.6,0.8h8.5v2.4c0,2.1-0.9,8.8-1.2,9.1c-0.1,0.1-1.6-0.3-3.4-0.6c-4.5-1-4.9-1-5.8,0.5c-0.6,1-0.7,1.5-0.3,2.2c0.6,1,0.8,1.1,5.7,2.1c2.8,0.6,2.9,0.6,2.6,1.9c-0.8,3.3-2.8,9.2-3.2,9.4c-0.3,0.2-3.8-1.1-7.9-2.8c-4.1-1.7-8-3-8.6-3c-1.3,0-2.4,1.6-1.9,3c0.3,1.1,0.3,1.1,9.1,4.6c3.6,1.5,6.8,2.8,7,3.1c0.6,0.4-4,9.5-4.9,9.8c-0.4,0.2-2.1-0.7-3.8-1.8c-3.5-2.3-4.1-2.4-5.3-1.3c-1.5,1.5-0.7,2.8,2.9,5.3l3.4,2.4l-3,3.7c-4.6,5.8-3.9,5.7-8.9,0.5c-5.6-6-9.7-9.1-16.9-12.6l-5.8-2.9L194,90c5.5-5.9,9.3-12.4,11.9-21l1.4-4.5l0.2-25.1l0.2-25h16.9h16.8V19.1z M183.6,35.8c-1.8,13.7-6.4,23.6-15.1,32.1c-7.9,7.8-19.5,13.2-30.1,14.2l-3.5,0.3l0.4-3.5c0.8-7.1,3-13.8,6.9-20.7c3-5.4,11.7-14.1,17.3-17.3c7.1-4.1,15.9-6.9,22-7l2.4-0.1L183.6,35.8z M104,96.3c2,0.5,6.1,1.8,9.3,2.9c6,2.3,12.2,3.8,15.4,3.8h1.8v4.3v4.3l-2.6-0.4c-1.5-0.2-3.8-0.8-5.4-1.3c-3.3-1.2-4.7-1.2-5.6-0.2c-3.4,4.1,11.8,7.9,23.2,5.8c7.9-1.5,10.8-3.2,9.6-5.5c-0.7-1.3-1.8-1.3-6.2-0.1c-2,0.6-4.6,1.1-5.9,1.3l-2.4,0.3v-4c0-4.4,0.2-4.6,3.8-4.6c2.9,0,9.5-1.6,14.8-3.6c9.9-3.7,16.7-4.8,24.7-3.9c6.5,0.7,10,1.7,15.5,4.3c8.6,4,14,8.4,21,17c6.3,7.8,10,14.4,13.2,23.5c3.3,9.5,4,14.1,4,25.7c0.1,11.4-0.5,15.3-3.3,24.2c-1.5,4.8-5.8,14.6-6.4,14.6c-0.2,0-0.9-1.5-1.5-3.3c-1.6-4.4-5.5-12.1-8.7-16.8c-8.9-13.3-20.7-23.5-36-31.2c-6.4-3.2-17.9-6.9-23.1-7.5c-1.4-0.2-2.9-0.4-3.3-0.6c-0.4-0.2-25.9-0.5-56.7-0.6l-56-0.3l1.2-3.8c1.9-5.8,6.8-15.4,10.4-20.2c3.8-5,12.6-13.7,16.8-16.5C77,96.2,90.8,93.4,104,96.3z M37.3,130c0,0.2-0.8,2.1-1.7,4.4c-1,2.3-2.1,5.5-2.6,7.1l-0.8,2.9h-6.3c-7.1,0-8.7-0.5-10.3-3.2c-1.3-2.1-1.3-6.1,0-8.2c1.7-2.8,3.3-3.2,13.1-3.2C33.3,129.7,37.3,129.8,37.3,130z M26.1,149.3l7.2,0.2v3.7c0,3.9,0.8,5.8,2.5,5.8c1.9,0,2.5-1.4,2.5-5.6v-4h4.8h4.8v8.9c0,7.6,0.1,9,0.9,9.8c1,1.1,2.1,1.2,3.3,0.1c0.8-0.7,0.9-1.7,0.9-9.8v-9h4.8h4.8v4c0,4.2,0.6,5.6,2.5,5.6c1.7,0,2.5-2,2.5-5.9v-3.7h4.8h4.8v9c0,9.6,0.3,10.6,2.5,10.6c2.1,0,2.5-1.7,2.5-10.9v-8.7h4.8h4.8v3.8c0,4.3,0.6,5.7,2.2,5.7c2,0,2.4-1,2.4-5.4v-4.2h5h5v9.3v9.3l1.3,0.6c0.9,0.5,1.5,0.5,2.1,0.1c0.8-0.5,0.9-1.8,1-9.9l0.1-9.4h5h5v4.2c0,4.4,0.4,5.4,2.3,5.4c1.9,0,2.3-1,2.3-5.4v-4.2h5h5l0.1,9.4c0.2,8.2,0.3,9.5,1,9.9c0.6,0.4,1.2,0.4,2.1-0.1l1.3-0.6v-9.4v-9.4l3.2,0.4c9,1,8.5,0.8,8.2,2.3c-0.2,0.7-0.5,2.7-0.6,4.4c-0.4,3-0.3,3.2,1,3.7c2,1,3.1-0.4,3.8-4.8c0.7-3.7,0.7-3.8,2-3.5c2.6,0.7,9.4,2.8,9.7,3.1c0.2,0.2-1.2,3.9-2.9,8.3c-3.5,8.4-3.6,9.7-1.4,10.2c1.9,0.5,2.5-0.5,6-9.1c1.6-4,3.2-7.4,3.4-7.4c0.3,0,2.7,1.2,5.4,2.6l4.9,2.6l-2.2,3.3c-2.3,3.4-2.7,5-1.7,6c1.5,1.5,2.9,0.7,5.2-2.9c1.3-2,2.5-3.5,2.6-3.5c0.3,0,5,3.7,7.6,5.9l1.6,1.4l-6.3,6.3c-5,5-6.3,6.5-6.3,7.7c0,1,0.4,1.6,1.3,2c1.2,0.6,1.6,0.3,7.7-5.8c3.6-3.6,6.7-6.4,7-6.3c0.8,0.3,7.2,8.1,7.2,8.7c0,0.3-1.5,1.5-3.3,2.7c-3.5,2.3-4.2,3.3-3.4,4.5c1.2,2,2,1.9,5.7-0.6c2-1.3,3.8-2.3,4-2.1c0.6,0.4,4.4,7.4,4.8,8.9c0.3,1.2,0,1.4-7.6,4.4c-8.4,3.4-9.8,4.5-8.6,6.3c0.4,0.6,1.1,1.1,1.6,1.2c0.6,0.1,4.5-1.3,8.8-3.1c4.3-1.8,8-3.1,8.2-3c0.4,0.3,3.4,9.7,3.4,10.6c0,0.3-1.5,0.8-3.4,1.2c-5.1,1-5.7,1.3-5.7,3c0,2.4,1.3,2.8,5.9,1.9c2.1-0.5,3.9-0.7,4.1-0.6c0.5,0.4,1,5.3,1.1,8.7l0.1,3.2h-16.9h-16.8l-0.3-1.9c-1.9-13.3-5.7-21.8-13.6-30.1c-6.5-7-14.2-11.8-23.3-14.7l-4.5-1.4l-63.7-0.3c-63-0.3-63.7-0.3-65.5-1.3c-3.3-2-3.3-2.2-3.1-19.8l0.2-15.7l2.1,1.1C18.6,149,19.8,149.1,26.1,149.3z M149.4,189.5c9.2,2.7,16.2,7,22,13.3c7.2,7.8,12,18.9,12,28.2c0,3.8,0.8,5.3,3,5.6c2.2,0.3,1.9,0.6-4.1,2.5c-14.9,4.7-33.4,3.9-46.2-2.1c-2.5-1.2-2.1-1.2-11,1.9c-7.2,2.5-12.7,3.4-21.1,3.4c-11.2,0-20.3-2.2-30-7.3c-12.8-6.7-24.6-18.9-31.4-32.5c-2.3-4.6-5.3-12.3-5.3-13.6c0-0.7,7-0.7,54.3-0.6C145,188.4,145.9,188.5,149.4,189.5z"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <h3 className="text-center">Calculate your BMI</h3>
          </div>

          <div className="form-row" autoComplete="off">
            <div className="form-group" autoComplete="off">
              <input
                autoComplete="off"
                type="text"
                name="height"
                placeholder="Height (CM)"
                className="form-control"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="form-group" autoComplete="off">
              <input
                autoComplete="off"
                type="text"
                name="weight"
                placeholder="Weight (KG)"
                className="form-control"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row" autoComplete="off">
            <div className="form-group" autoComplete="off">
              <button
                className="bmi-submit"
                onClick={calculateBmi}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  backgroundColor: "#ed563b",
                  color: "white",
                  borderColor: "white",
                }}
              >
                {" "}
                Calculate{" "}
              </button>
            </div>
            <div className="form-group" autoComplete="off">
              <input
                autoComplete="off"
                type="text"
                name="results"
                placeholder="Results"
                className="form-control"
                readOnly="true"
                value={bmiResult}
              />
            </div>
          </div>
          <div
            className="form-row"
            autoComplete="off"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "800%",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            {" "}
            <h6
              className="bmi-category"
              style={{
                color: getBmiColor(parseFloat(bmiResult)),
                fontSize: "30%",
                fontWeight: "bold",
                WebkitTextStroke: "1px white",
              }}
            >
              {" "}
              {bmiResult}{" "}
            </h6>{" "}
            <h6 className="bmi-category">{bmiInfo}</h6>{" "}
          </div>
        </form>
      </div>
    </section>
  );
}
