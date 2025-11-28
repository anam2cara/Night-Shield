import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  return (
    <div 
      onClick={() => onChange(!checked)}
      className={`toggle-switch ${checked ? 'on' : 'off'}`}
    >
      <div className={`toggle-knob ${checked ? 'on' : 'off'}`} />
    </div>
  );
};