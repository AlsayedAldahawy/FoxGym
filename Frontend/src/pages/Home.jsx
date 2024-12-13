import SearchDropdown from "../components/HomeSearch";

import gymImage from "../assets/images/backgrounds/bg_home.jpg";
import '../assets/css/home.css';

export default function Home() {
  return (
    <>
      <div className="background">
        <img src={gymImage} alt="Background" />
        <div className="bg-shadow"></div>
      </div>
      <div className="home-content">
        <div className="caption">
          <h6>work harder, get stronger</h6>
          <h2>
            easy with Fox <em>gym</em>
          </h2>
        </div>
        <SearchDropdown />
      </div>
    </>
  );
}
