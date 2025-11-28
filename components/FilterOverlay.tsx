import React, { useMemo } from 'react';
import { FilterMode } from '../App';

interface FilterOverlayProps {
  isActive: boolean;
  mode: FilterMode;
  intensity: number;
}

export const FilterOverlay: React.FC<FilterOverlayProps> = ({ isActive, mode, intensity }) => {
  
  // Calculate the RGBA color string based on mode and intensity
  const overlayStyle = useMemo(() => {
    if (!isActive) return { opacity: 0 };

    const opacityValue = intensity / 100;
    let backgroundColor = '';

    if (mode === 'blue') {
      // Orange overlay for blue light filter
      backgroundColor = `rgba(255, 140, 0, ${opacityValue})`; 
    } else {
      // Black overlay for dimming
      backgroundColor = `rgba(0, 0, 0, ${opacityValue})`;
    }

    return {
      opacity: 1,
      backgroundColor,
    };
  }, [isActive, mode, intensity]);

  return (
    <div 
      className="filter-overlay"
      style={overlayStyle}
      aria-hidden="true"
    />
  );
};