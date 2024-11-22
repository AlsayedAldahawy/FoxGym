import React from "react";
import "../assets/css/memberPage.css"
import sadFox from "../assets/images/profile_pics/sad_fox.png"

function NotFound() {
  return (
    <div className="member-not-found">
        <div className="sad-fox">
          <img src={sadFox} alt="" />
        </div>
        <div className="four-0-4">
          <h1>404 - Not Found</h1>
          <p>
            Oops! Looks like this page decided to skip leg day.
          </p>
        </div>
      </div>
  );
}
export default NotFound;
