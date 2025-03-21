import React from 'react';

const getUVLevel = (uvIndex) => {
  if (uvIndex <= 2) return { level: 'Low', color: 'bg-green-500' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'bg-yellow-500' };
  if (uvIndex <= 7) return { level: 'High', color: 'bg-orange-500' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'bg-red-500' };
  return { level: 'Extreme', color: 'bg-purple-500' };
};

const UVIndexCard = ({ data, theme }) => {
  const uvIndex = data.current.uv;
  const { level, color } = getUVLevel(uvIndex);
  
  // Determine background color for progress bar based on theme
  const progressBgColor = theme.cardBg === 'bg-gray-800/90' ? 'bg-gray-700' : 'bg-gray-200';
  const textColorMuted = theme.cardBg === 'bg-gray-800/90' ? 'text-gray-400' : 'text-gray-500';
  
  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-4 transition-colors duration-300`}>
      <h3 className={`text-lg font-semibold mb-3 ${theme.textColor}`}>UV Index</h3>
      <div className="flex flex-col">
        <p className={`text-3xl font-bold ${theme.textColor}`}>{uvIndex}</p>
        <p className={`text-sm ${theme.textColor} opacity-75 mb-2`}>{level}</p>
        
        <div className={`w-full ${progressBgColor} rounded-full h-2.5`}>
          <div 
            className={`${color} h-2.5 rounded-full`} 
            style={{ width: `${Math.min(uvIndex * 10, 100)}%` }}
          ></div>
        </div>
        
        <div className={`flex justify-between text-xs ${textColorMuted} mt-1`}>
          <span>0</span>
          <span>5</span>
          <span>10+</span>
        </div>
      </div>
    </div>
  );
};

export default UVIndexCard;