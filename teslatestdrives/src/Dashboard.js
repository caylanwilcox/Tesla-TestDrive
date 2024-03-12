// DashboardGrid.js
import React from 'react';
import './Dashboard.css'; // make sure to create this CSS file for styling


const Dashboard = ({ inventory }) => {
  return (
    <div className="dashboard-grid">
      {inventory.map((item, index) => {
        console.log(`image path ${index}: ${item.imagePath}`); // Corrected log statement
        return (
          <div key={item.id} className="grid-item"> {/* Ensure each item has a unique key and is wrapped in a div */}
            <div className="car-info">
              <div className="car-vin">VIN: {item.id}</div>
              <div className="car-status">Status: {item.cleanStatus ? 'Clean' : 'Dirty'}</div>
              <div className="battery-percentage">Battery: {item.batteryPercentage}%</div>
              <div className="car-in-out">Location: {item.inOut}</div>
              {/* You can add more car details here */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;