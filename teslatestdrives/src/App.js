import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.js';
import DashboardNumbers from './DashboardNumbers.js';
import CleanDirtyToggle from './CleanDirtyToggle';
import { ref, onValue, getDatabase } from 'firebase/database';
import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
// Initial data for parking spots

function App() {
  
  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    // Fetch static data from cars.json
    fetch('/cars.json')
      .then(response => response.json())
      .then(staticData => {
        // Now set up the Firebase listener
        const dbRef = ref(getDatabase());
        const unsubscribe = onValue(ref(dbRef, 'path/to/inventory'), (snapshot) => {
          const dynamicData = snapshot.val();
          
          // Merge the Firebase data with the static image data
          const inventoryWithImages = Object.keys(dynamicData).map((key) => {
            const carDynamicData = dynamicData[key];
            const carStaticData = staticData.find(car => car.id === carDynamicData.id);
            
            return {
              ...carDynamicData,
              imagePath: carStaticData 
                ? `/images/${carStaticData.model}/${carStaticData.wheel}/${carStaticData.color}/${carStaticData.name}.png`
                : '/images/default.png' // Fallback image path in case there's no matching entry in cars.json
            };
          });

          setInventory(inventoryWithImages);
        });

        return () => unsubscribe();
      })
      .catch(error => console.error('Failed to load car data:', error));
  }, []);


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
     
      {/* Navigation Links - Make sure these are outside of your Routes if you want them accessible from everywhere */}
      <div className="navigation-links">
        <Link to="/dashboard" className="dashboard-link">Go to Dashboard</Link>
        <Link to="/" className="inventory-link">View Inventory</Link> {/* Updated to root path */}
      </div>

      {/* Define your Routes */}
    
      <Routes>
        {/* Define the home route */}
        
       
        {/* Define the dashboard route which will only show the Dashboard content */}
        <Route path="/dashboard" element={<Dashboard inventory={inventory} />} />
        {/* Define the inventory route which will only show the inventory list */}
        
        <Route path="/" element={
          <>
            <Header />
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
          <th>Trim</th>
            <th>VIN</th>
             {/* Added Trim header */}
            <th>Clean Status</th>
            <th>Battery %</th>
            <th>In/Out</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item.id}>
              <td>{item.trim}</td> {/* Added Trim data cell */}
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
                  onChange={(e) => handleChange(e, index)}
                />
              </td>
              <td>
                <select 
                  name="inOut" 
                  className="inOut"
                  value={item.inOut} 
                  onChange={(e) => handleChange(e, index)}
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
       </> } />
      </Routes>
    </div>
  );
}

export default App;