import React, { useState } from "react";
import { Link } from "react-router-dom";
import StickyHeadTable from "../components/MembersTable";
import "../assets/css/Members.css"; 
import SearchField from "../components/searchModel";
import bg from "../assets/images/backgrounds/bg_add_member.jpg"

const Members = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  };

  return (
    <>

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
      {/* <div className="background_members">
        <img src={bg} alt="" />
      </div> */}
    </>
  );
};

export default Members;
