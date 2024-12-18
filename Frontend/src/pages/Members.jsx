import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StickyHeadTable from "../components/MembersTable";
import "../assets/css/Members.css";
import SearchField from "../components/searchModel";
import bg from "../assets/images/backgrounds/bg_login.png";

const Members = () => {
  const [searchQuery, setSearchQuery] = useState("");



  const handleSearchChange = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  };



  return (
    <>
      <div className="background">
        <img src={bg} alt="Background" />
        <div className="bg-shadow"></div>
      </div>
      <div className="members-container">
        <div className="header-container">
          <h2 className="header">Members Table</h2>
          <div style={{ padding: "16px", fontWeight: "bold", display: "flex" }}>
            <SearchField onSearch={handleSearchChange} />
          </div>
          <Link to="/add-new-member">
            <button className="add-member-btn">Add New Member</button>
          </Link>
        </div>
        <StickyHeadTable searchQuery={searchQuery} />
      </div>
    </>
  );
};

export default Members;
