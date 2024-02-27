import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import DashboardNumbers from './DashboardNumbers.js';
import CleanDirtyToggle from './CleanDirtyToggle';
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
    { id: 433116, cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: '' },
    { id: 977895, cleanStatus: true, batteryPercentage: 75, inOut: 'out', driver: 'Jane Smith' },
  { id: 985934, cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: '' },
  { id: 985965, cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: '' },
  { id: 985935, cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: '' },
  { id: '006179', cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: '' },
  { id: 985412, cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: '' },
  { id: 718342, cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: '' },
    { id: 717077, cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: '' },
  { id: 717303, cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: '' },

  
  
  
  
  
  
  ]);
  // Function to replace and add VINsa



// Call the function to replace and add VINs

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
  const handleToggleCleanStatus = (index) => {
    setInventory(currentInventory => {
      // Create a new copy of the inventory array
      const newInventory = [...currentInventory];
      // Toggle the clean status of the car at the specific index
      newInventory[index] = {
        ...newInventory[index],
        cleanStatus: !newInventory[index].cleanStatus,
      };
      return newInventory; // Return the updated inventory array
    });
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
                <CleanDirtyToggle
                  isClean={item.cleanStatus}
                  onToggle={() => handleToggleCleanStatus(index)}
                />
              </td>
              <td>
                <input 
                  type="number" 
                  name="batteryPercentage" 
                  className="batteryPercentage"
                  value={item.batteryPercentage} 
                  onChange={(e) => handleChange(e, index)}  // onChange listener for inventory batteryPercentage
                />
              </td>
              <td>
                <select 
                  name="inOut" 
                  className="inOut"
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