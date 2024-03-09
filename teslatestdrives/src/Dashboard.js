// Dashboard.js
import React from 'react';
import './Dashboard.css';

function Dashboard({ inventory }) {
  return (
    <div className="dashboard">
      {/* Assuming you have a header and other content */}
     <div className="inventory-container">
            {inventory.map((item, index) => (
              <div
                key={item.id}
                className="inventory-item"
                style={{ backgroundImage: `url(${item.imagePath})` }}
              >
                <div className="car-info">
                  <div className="car-vin">VIN: {item.id}</div>
                  <div className="car-status">Status: {item.cleanStatus ? 'Clean' : 'Dirty'}</div>
                  <div className="battery-percentage">Battery: {item.batteryPercentage}%</div>
                  <div className="car-in-out">Location: {item.inOut}</div>
                  {/* You can add more car details here */}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
