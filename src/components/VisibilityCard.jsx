import React from 'react';

const VisibilityCard = ({ data, theme }) => {
  const current = data.current;
  
  // Function to determine visibility level
  const getVisibilityLevel = (visibility) => {
    if (visibility >= 10) return { level: 'Excellent', color: 'text-green-500' };
    if (visibility >= 5) return { level: 'Good', color: 'text-blue-500' };
    if (visibility >= 2) return { level: 'Moderate', color: 'text-yellow-500' };
    if (visibility >= 1) return { level: 'Poor', color: 'text-orange-500' };
    return { level: 'Very Poor', color: 'text-red-500' };
  };
  
  const { level, color } = getVisibilityLevel(current.vis_km);
  
  // Determine background color for progress bar based on theme
  const progressBgColor = theme.cardBg === 'bg-gray-800/90' ? 'bg-gray-700' : 'bg-gray-200';
  const textColorMuted = theme.cardBg === 'bg-gray-800/90' ? 'text-gray-400' : 'text-gray-500';
  
  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-4 transition-colors duration-300`}>
      <h3 className={`text-lg font-semibold mb-3 ${theme.textColor}`}>Visibility</h3>
      <div className="flex flex-col">
        <p className={`text-3xl font-bold ${theme.textColor}`}>{current.vis_km} km</p>
        <p className={`text-sm ${color} mb-2`}>{level}</p>
        
        <div className={`w-full ${progressBgColor} rounded-full h-2.5 mt-2`}>
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${Math.min((current.vis_km / 10) * 100, 100)}%` }}
          ></div>
        </div>
        
        <div className={`flex justify-between text-xs ${textColorMuted} mt-1`}>
          <span>0 km</span>
          <span>5 km</span>
          <span>10+ km</span>
        </div>
      </div>
    </div>
  );
};

export default VisibilityCard;