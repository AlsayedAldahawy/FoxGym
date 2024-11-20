import React from 'react';
import { Link } from 'react-router-dom';
import StickyHeadTable from '../components/MembersTable';  // Adjust path if needed
import '../assets/css/Members.css';  // Make sure to import the CSS file
import SearchField from '../components/searchModel'


export default function Members() {
  return (
    <div className="members-container">
      <div className="header-container">
        <h2 className='header'>Members Table</h2>
        <div style={{ padding: '16px', fontWeight: 'bold', display: 'flex'}}>
          <SearchField />
        </div>
        <Link to="/add-new-member">
          <button className="add-member-btn">Add New Member</button>
        </Link>
      </div>
      <StickyHeadTable />
    </div>
  );
}
