import { useNavigate } from "react-router-dom";
import "../assets/css/SearchDropdown.css"; // Import the CSS file for styling

const ResultCard = ({result}) => {
//   console.log(result);


    const statusClass = `result-${result.status}`

  const navigate = useNavigate();
  
  const handleNavigate = (id) => {
    console.log(`Navigating to /member/${id}`);
    navigate(`/member/${id}`);
  };



  return (
    <>
      <li
        className="dropdown-item"
        onClick={() => handleNavigate(result.id)}
      >
        <div className="searchCard">
          <span className="result-name">{result.userName}</span>
          <span className="result-id">{result.id}</span>
          <span className={statusClass}>{result.status}</span>
        </div>
      </li>
    </>
  );
};

export default ResultCard;
