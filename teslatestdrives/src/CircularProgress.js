// Import React and any hooks if necessary
import React from 'react';
import './CircularProgress.css'
// The circular progress component
const CircularProgress = ({ progress }) => {
  const radius = 45; // Radius of the circle
  const stroke = 10; // Width of the progress stroke
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100 * circumference);

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      <circle
        stroke="white"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.35s ease-in-out' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fill="white"
        fontSize="10"
      >
        {progress}%
      </text>
    </svg>
  );
};

// Export the component
export default CircularProgress;
