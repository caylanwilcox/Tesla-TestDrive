import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import DashboardNumbers from './DashboardNumbers.js';

// Initial data for parking spots

const initialParkingSpots = new Array(10).fill(null).map((_, index) => ({
  id: '',
  carInfo: {
    cleanStatus: false,
    batteryPercentage: 0,
    inOut: 'in', // Assuming 'in' as default
    driver: ''
  },
  occupied: false
}));

function App() {
  
  const [inventory, setInventory] = useState([
    { id: 55566, cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: 'John Doe' },
    { id: 55566, cleanStatus: false, batteryPercentage: 75, inOut: 'out', driver: 'Jane Smith' },
  ]);
  const totalTestDriveCars = inventory.length;
  const totalAvailable = inventory.filter(item => item.inOut === 'in').length;
  const totalOut = inventory.filter(item => item.inOut === 'out').length;
  const needsCharge = inventory.filter(item => item.batteryPercentage < 70).length; // Example threshold

  const [newEntry, setNewEntry] = useState({ cleanStatus: true, batteryPercentage: 100, inOut: 'in', driver: '' });

    const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;

    if (index === -1) { // This is for the new entry form
      setNewEntry({
        ...newEntry,
        [name]: type === 'checkbox' ? checked : value,
      });
    } else { // This is for existing inventory items
      const updatedInventory = [...inventory];
      const item = updatedInventory[index];
      item[name] = type === 'checkbox' ? checked : value;
      setInventory(updatedInventory);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInventory((prev) => [...prev, { ...newEntry, id: Date.now() }]);
    setNewEntry({ cleanStatus: true, batteryPercentage: 100, inOut: 'in', driver: '' });
  };

  const handleDelete = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <Sidebar  />
      
  <DashboardNumbers 
        totalTestDriveCars={totalTestDriveCars} 
        totalAvailable={totalAvailable} 
        totalOut={totalOut}
                needsCharge={needsCharge}
      />     
        <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Clean Status</th>
            <th>Battery %</th>
            <th>In/Out</th>       </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <input 
                className="checkbox;"
                  type="checkbox" 
                  name="cleanStatus" 
                  checked={item.cleanStatus} 
                  onChange={(e) => handleChange(e, index)}  // onChange listener for inventory cleanStatus
                />
              </td>
              <td>
                <input 
                  type="number" 
                  name="batteryPercentage" 
                  value={item.batteryPercentage} 
                  onChange={(e) => handleChange(e, index)}  // onChange listener for inventory batteryPercentage
                />
              </td>
              <td>
                <select 
                  name="inOut" 
                  value={item.inOut} 
                  onChange={(e) => handleChange(e, index)}  // onChange listener for inventory inOut
                >
                  <option value="in">In</option>
                  <option value="out">Out</option>
                </select>
              </td>
            
            </tr>
            
          ))}
        </tbody>
      </table>
      </div>
     
    </div>
  );
}

export default App;