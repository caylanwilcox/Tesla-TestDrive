import React from 'react';
import './CleanDirtyToggle.css'; // Make sure to create this CSS file

const CleanDirtyToggle = ({ isClean, onToggle }) => (
  <button className={`toggle-button ${isClean ? 'clean' : 'dirty'}`} onClick={onToggle}>
    {isClean ? 'Clean' : 'Dirty'}
  </button>
);

export default CleanDirtyToggle;