import React from 'react';

function Sidebar({ totalTestDriveCars, totalAvailable, totalOut }) {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <div className="sidebar-stat">
        <h3>Total Test Drive Cars</h3>
        <p>{totalTestDriveCars}</p>
      </div>
      <div className="sidebar-stat">
        <h3>Available</h3>
        <p>{totalAvailable}</p>
      </div>
      <div className="sidebar-stat">
        <h3>Out</h3>
        <p>{totalOut}</p>
      </div>
    </div>
  );
}

export default Sidebar;
