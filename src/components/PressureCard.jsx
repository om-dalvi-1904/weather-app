import React from 'react';

const PressureCard = ({ data, theme }) => {
  const current = data.current;
  
  // Function to determine pressure level
  const getPressureLevel = (pressure) => {
    if (pressure < 1000) return { level: 'Low', color: 'text-blue-500' };
    if (pressure > 1020) return { level: 'High', color: 'text-red-500' };
    return { level: 'Normal', color: 'text-green-500' };
  };
  
  const { level, color } = getPressureLevel(current.pressure_mb);
  
  // Determine background color for progress bar based on theme
  const progressBgColor = theme.cardBg === 'bg-gray-800/90' ? 'bg-gray-700' : 'bg-gray-200';
  const textColorMuted = theme.cardBg === 'bg-gray-800/90' ? 'text-gray-400' : 'text-gray-500';
  
  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-4 transition-colors duration-300`}>
      <h3 className={`text-lg font-semibold mb-3 ${theme.textColor}`}>Pressure</h3>
      <div className="flex flex-col">
        <p className={`text-3xl font-bold ${theme.textColor}`}>{current.pressure_mb} mb</p>
        <p className={`text-sm ${color} mb-2`}>{level}</p>
        
        <div className={`w-full ${progressBgColor} rounded-full h-2.5 mt-2`}>
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${Math.min(Math.max((current.pressure_mb - 950) / 150, 0) * 100, 100)}%` }}
          ></div>
        </div>
        
        <div className={`flex justify-between text-xs ${textColorMuted} mt-1`}>
          <span>950 mb</span>
          <span>1000 mb</span>
          <span>1050 mb</span>
          <span>1100 mb</span>
        </div>
      </div>
      
      <p className={`text-xs ${textColorMuted} mt-3`}>
        {level === 'Low' ? 'Low pressure often brings clouds and precipitation.' : 
         level === 'High' ? 'High pressure typically means clear and stable weather.' : 
         'Normal atmospheric pressure indicates stable conditions.'}
      </p>
    </div>
  );
};

export default PressureCard;