import React, { useState } from 'react';
import { Toggle } from './components/Toggle';
import { FilterOverlay } from './components/FilterOverlay';

// Define types for our application state
export type FilterMode = 'blue' | 'dim';

export default function App() {
  // State management to mirror the requested functionality
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<FilterMode>('blue');
  const [intensity, setIntensity] = useState<number>(30);

  return (
    <div className="app-container">
      
      {/* The Overlay Layer */}
      <FilterOverlay 
        isActive={isActive} 
        mode={mode} 
        intensity={intensity} 
      />

      {/* Main Content Area */}
      <div className="content-wrapper">
        
        {/* Title */}
        <h1 className="app-title">
          Simple Light Filter
        </h1>

        {/* Mode Selection */}
        <div className="control-group">
          <label htmlFor="mode" className="label">
            Mode:
          </label>
          <div className="select-wrapper">
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as FilterMode)}
              className="select-input"
            >
              <option value="blue">Blue Light Filter</option>
              <option value="dim">Dim Light</option>
            </select>
            {/* Custom Arrow Icon */}
            <div className="select-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="toggle-row">
          <label className="toggle-label">
            Aktifkan Filter:
          </label>
          <Toggle checked={isActive} onChange={setIsActive} />
        </div>

        {/* Intensity Slider */}
        <div className="slider-group">
          <label htmlFor="intensity" className="label" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            Intensitas: {intensity}%
          </label>
          <input
            type="range"
            id="intensity"
            min="5"
            max="90"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="slider-input"
          />
        </div>

      </div>

      {/* Android-like simulated toast/status bar (Optional visual flair) */}
      <div className="status-bar-scrim"></div>
    </div>
  );
}