import React from 'react';
import './Dashboard.css'; // Make sure to create this CSS file for styling

const Dashboard = ({ inventory }) => {
  // Grouping the inventory by model
  const groupedInventory = inventory.reduce((group, item) => {
    const { model } = item;
    group[model] = group[model] || [];
    group[model].push(item);
    return group;
  }, {});
 
  const getStatusClass = (cleanStatus) => {
    return cleanStatus ? 'status-clean' : 'status-dirty';
  };

  const getBatteryClass = (batteryPercentage) => {
    return batteryPercentage >= 70 ? 'battery-high' : 'battery-low';
  };

  const getLocationClass = (inOut) => {
    return inOut === 'in' ? 'location-in' : 'location-out';
  };

  return (
    <div className="dashboard">
      {Object.entries(groupedInventory).map(([model, items]) => (
        <div key={model} className="model-group">
          <div className="model-group-header">{model}</div>
          <div className="dashboard-grid">
            {items.map((item) => (
              <div key={item.id} className="grid-item">
                <div className="car-header">
                  <div className="image-container">
                    <img src={item.imagePath} alt={`Car ${item.model}`} className="car-image" />
                  </div>
                  <div className="car-info">
                    <div className="car-status">
                      Status: <span className={getStatusClass(item.cleanStatus)}>{item.cleanStatus ? 'Clean' : 'Dirty'}</span>
                    </div>
                    <div className="battery-percentage">
                      Battery: <span className={getBatteryClass(item.batteryPercentage)}>{item.batteryPercentage}%</span>
                    </div>
                    <div className="car-in-out">
                      Location: <span className={getLocationClass(item.inOut)}>{item.inOut}</span>
                    </div>
                  </div>
                </div>
                <div className="car-vin">{item.trim} VIN: {item.id}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;