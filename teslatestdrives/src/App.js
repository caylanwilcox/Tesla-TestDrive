import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
// Initial data for parking spots

const initialParkingSpots = new Array(10).fill(null).map((_, index) => ({
  id: index,
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
    { id: 1, cleanStatus: true, batteryPercentage: 90, inOut: 'in', driver: 'John Doe' },
    { id: 2, cleanStatus: false, batteryPercentage: 75, inOut: 'out', driver: 'Jane Smith' },
  ]);
  const totalTestDriveCars = inventory.length;
  const totalAvailable = inventory.filter(item => item.inOut === 'in').length;
  const totalOut = inventory.filter(item => item.inOut === 'out').length;

  const [newEntry, setNewEntry] = useState({ cleanStatus: true, batteryPercentage: 100, inOut: 'in', driver: '' });

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedInventory = [...inventory];
    updatedInventory[index][name] = type === 'checkbox' ? checked : value;
    setInventory(updatedInventory);
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
          <Sidebar totalTestDriveCars={totalTestDriveCars} totalAvailable={totalAvailable} totalOut={totalOut} />

      <h1>Tesla Test Drive Inventory Manager</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Clean Status:
          <input type="checkbox" name="cleanStatus" checked={newEntry.cleanStatus} onChange={(e) => handleChange(e, -1)} />
        </label>
        <label>
          Battery Percentage:
          <input type="number" name="batteryPercentage" value={newEntry.batteryPercentage} onChange={(e) => handleChange(e, -1)} />
        </label>
        <label>
          In/Out:
          <select name="inOut" value={newEntry.inOut} onChange={(e) => handleChange(e, -1)}>
            <option value="in">In</option>
            <option value="out">Out</option>
          </select>
        </label>
        <label>
          Driver:
          <input type="text" name="driver" value={newEntry.driver} onChange={(e) => handleChange(e, -1)} />
        </label>
        <button type="submit">Add Entry</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Clean Status</th>
            <th>Battery Percentage</th>
            <th>In/Out</th>
            <th>Driver</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td><input type="checkbox" name="cleanStatus" checked={item.cleanStatus} onChange={(e) => handleChange(e, index)} /></td>
              <td><input type="number" name="batteryPercentage" value={item.batteryPercentage} onChange={(e) => handleChange(e, index)} /></td>
              <td>
                <select name="inOut" value={item.inOut} onChange={(e) => handleChange(e, index)}>
                  <option value="in">In</option>
                  <option value="out">Out</option>
                </select>
              </td>
              <td><input type="text" name="driver" value={item.driver} onChange={(e) => handleChange(e, index)} /></td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;