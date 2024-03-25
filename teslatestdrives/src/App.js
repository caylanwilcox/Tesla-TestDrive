import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.js';
import DashboardNumbers from './DashboardNumbers.js';
import CleanDirtyToggle from './CleanDirtyToggle';
import { ref, onValue, getDatabase, set, remove } from 'firebase/database';
import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { database } from './firebase';
// Initial data for parking spots

function App() {
  
  const [inventory, setInventory] = useState([]);
 useEffect(() => {
  // Fetch static data from cars.json
  fetch('/cars.json')
    .then(response => response.json())
    .then(staticData => {
      // Reference to the root of the Firebase database
      const dbRef = ref(database); 
      // Listen for value changes
      const unsubscribe = onValue(dbRef, (snapshot) => {
        const dynamicData = snapshot.val();
        if (dynamicData && Array.isArray(dynamicData)) {
          // Merge the Firebase data with the static image data
          const inventoryWithImages = dynamicData.map((carDynamicData) => {
            // Find the corresponding static data
            const carStaticData = staticData.find(car => car.id === carDynamicData.id);
            
            return {
              ...carDynamicData,
              // Add the image path from static data or use a default
              imagePath: carStaticData 
                ? `/images/${carStaticData.model}/${carStaticData.wheel}/${carStaticData.color}/${carStaticData.name}.png`
                : '/images/default.png'
            };
          });

          // Update state with the merged data
          setInventory(inventoryWithImages);
        } else {
          console.log('No data available');
        }
      });

      // Cleanup the listener when the component unmounts
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
    const updatedValue = type === 'checkbox' ? checked : value;

    // Update the state for the new entry form
    if (index === -1) {
        setNewEntry({
            ...newEntry,
            [name]: updatedValue,
        });
    } else {
        // Update the state and Firebase for existing inventory items
        setInventory(currentInventory => {
            const newInventory = [...currentInventory];
            const item = { ...newInventory[index], [name]: updatedValue };

            // Update Firebase database
            const itemRef = ref(database, `${index}`); // Assuming index maps directly to the Firebase array index
            set(itemRef, item).then(() => {
                console.log('Firebase updated successfully');
            }).catch(error => {
                console.error('Failed to update item in Firebase:', error);
            });

            newInventory[index] = item;
            return newInventory;
        });
    }
};
  const handleToggleCleanStatus = (index) => {
  setInventory(currentInventory => {
    const newInventory = [...currentInventory];
    const item = { ...newInventory[index] };

    // Toggle the clean status
    item.cleanStatus = !item.cleanStatus;

    // Update the local state first
    newInventory[index] = item;

    // Then, update the item in the Firebase database
    // Using the index as the key if the root is an array
    const itemRef = ref(database, `${index}`);
    set(itemRef, item).catch(error => {
      console.error('Failed to update clean status in database:', error);
    });

    return newInventory;
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