import React, { useState, useEffect } from 'react';
import './Dashboard.css';


const CircularProgressWithTicks = ({ progress, size }) => {
  const ticks = [];
  const radius = size / 2;
  const tickLength = size * 0.1; // Increase the length of the ticks
  const tickWidth = size * 0.02; // Adjust the width of the ticks if needed

  // Generate tick marks for each degree
  for (let i = 0; i < 360; i += 6) { // Adjust the increment for fewer ticks
    const isHighlighted = i < progress * 3.6;
    const rotation = `rotate(${i} ${radius} ${radius})`;
    ticks.push(
      <rect
        key={i}
        x={radius - tickWidth / 2}
        y={size * 0.15} // Position based on the new tick length
        width={tickWidth}
        height={tickLength}
        fill={isHighlighted ? 'green' : 'darkgrey'} // Use a darker color for non-highlighted ticks
        transform={rotation}
      />
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={radius} cy={radius} r={radius - size * 0.15 - tickLength} fill="#000" />
      {ticks}
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize={size / 8}>
        {progress}%
      </text>
    </svg>
  );
};

const Dashboard = ({ inventory }) => {
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 800);
  const getStatusClass = (cleanStatus) => cleanStatus ? 'status-clean' : 'status-dirty';
  const getBatteryClass = (batteryPercentage) => batteryPercentage >= 70 ? 'battery-high' : 'battery-low';
  const getLocationClass = (inOut) => inOut === 'in' ? 'location-in' : 'location-out';



  // Calculate grid template columns based on inventory count
  const calculateGridTemplate = (itemsCount) => {
    if (itemsCount < 4) {
      return `repeat(${itemsCount}, minmax(250px, 1fr))`;
    }
    return 'repeat(auto-fit, minmax(250px, 1fr))';
  };





  // Map inventory to render each car with a circular progress bar indicating the battery level
  const renderCarItem = (item) => {
    const progressBarSize = 100; // The overall size of the progress bar
    const imageSize = progressBarSize * 6; // The size of the car image, relative to the progress bar
    const isBatteryLow = item.batteryPercentage < 20; // Define what you consider a low battery

 return (
    <div key={item.id} className="grid-item">
      <div className="progress-bar-container">
        <CircularProgressWithTicks progress={item.batteryPercentage} size={100} />
      </div>
 <div className="vin-container">
      VIN: {item.id} <span className="trim-detail">{item.trim}</span>
    </div>      <div className="car-image-container" style={{ backgroundImage: `url(${item.imagePath})` }} />

      {item.batteryPercentage < 20 && <div className="low-battery-warning">Low Battery</div>}
    

    </div>
  );
};

  // Extracted inventory for Model S and Model X
  const sxInventory = inventory.filter(item => item.model === 'ModelS' || item.model === 'ModelX');
  const otherInventory = inventory.filter(item => item.model !== 'ModelS' && item.model !== 'ModelX');

  // Grouped inventory by model
  const groupedInventory = otherInventory.reduce((group, item) => {
    const { model } = item;
    group[model] = group[model] || [];
    group[model].push(item);
    return group;
  }, {});

  return (
    <div className="dashboard">
      <div className="model-group combined-sx-group">
        <div className="model-group-header">Model S/X</div>
        <div className="dashboard-grid" style={{ gridTemplateColumns: calculateGridTemplate(sxInventory.length) }}>
          {sxInventory.map(renderCarItem)}
        </div>
      </div>
      {Object.entries(groupedInventory).map(([model, items]) => (
        <div key={model} className="model-group">
          <div className="model-group-header">{model}</div>
          <div className="dashboard-grid" style={{ gridTemplateColumns: calculateGridTemplate(items.length) }}>
            {items.map(renderCarItem)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;