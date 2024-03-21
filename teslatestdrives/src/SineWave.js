// SineWave.js
import React, { useRef, useEffect } from 'react';

const SineWave = ({ percentage, containerRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');
    canvas.width = containerWidth;
    // Height of the sine wave is based on the battery percentage
    canvas.height = (percentage / 100) * containerHeight;

    const wave = {
      y: canvas.height / 2,
      length: 0.01,
      amplitude: 20, // Amplitude can be fixed or adjusted based on container height
      frequency: 0.01
    };

    let increment = wave.frequency;

    const animate = () => {
      requestAnimationFrame(animate);
      c.fillStyle = 'rgba(0, 0, 0, 0.01)';
      c.fillRect(0, 0, canvas.width, canvas.height);

      c.beginPath();
      c.moveTo(0, wave.y);

      for (let i = 0; i < canvas.width; i++) {
        c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude);
      }

      c.strokeStyle = 'hsl(200, 50%, 50%)';
      c.stroke();
      increment += wave.frequency;
    };

    animate();
  }, [percentage, containerRef]); // Re-run the effect if percentage or containerRef changes

  return <canvas ref={canvasRef} />;
};

export default SineWave;
