import React from 'react';

function DashboardNumbers({ totalTestDriveCars, totalAvailable, totalOut, needsCharge,dirtyCars  }) {
  return (
    <div className="dashboard-numbers">
      <div className="number-item">
        <span className="number">{totalTestDriveCars}</span>
        <span className="label">Total</span>
      </div>
      <div className="number-item">
        <span className="number">{totalAvailable}</span>
        <span className="label">Available</span>
      </div>
      <div className="number-item">
        <span className="number">{totalOut}</span>
        <span className="label">Out</span>
      </div>
      
      <div className="number-item">
        <span className="number">{needsCharge}</span>
        <span className="label">Needs Charge</span>
      </div>
    </div>
  );
}

export default DashboardNumbers;
