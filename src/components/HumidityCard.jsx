import React from 'react';

const HumidityCard = ({ data, theme }) => {
  const current = data.current;
  
  // Function to determine humidity comfort level
  const getHumidityLevel = (humidity) => {
    if (humidity < 30) return { level: 'Dry', color: 'text-yellow-500' };
    if (humidity < 60) return { level: 'Comfortable', color: 'text-green-500' };
    return { level: 'Humid', color: 'text-blue-500' };
  };
  
  const { level, color } = getHumidityLevel(current.humidity);
  
  // Determine background color for progress bar based on theme
  const progressBgColor = theme.cardBg === 'bg-gray-800/90' ? 'bg-gray-700' : 'bg-gray-200';
  const textColorMuted = theme.cardBg === 'bg-gray-800/90' ? 'text-gray-400' : 'text-gray-500';
  
  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-4 transition-colors duration-300`}>
      <h3 className={`text-lg font-semibold mb-3 ${theme.textColor}`}>Humidity</h3>
      <div className="flex flex-col">
        <p className={`text-3xl font-bold ${theme.textColor}`}>{current.humidity}%</p>
        <p className={`text-sm ${color} mb-2`}>{level}</p>
        
        <div className={`w-full ${progressBgColor} rounded-full h-2.5 mt-2`}>
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${current.humidity}%` }}
          ></div>
        </div>
        
        <div className={`flex justify-between text-xs ${textColorMuted} mt-1`}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      <p className={`text-xs ${textColorMuted} mt-3`}>
        {level === 'Dry' ? 'Low humidity can cause dry skin and respiratory issues.' : 
         level === 'Comfortable' ? 'Ideal humidity for comfort and health.' : 
         'High humidity can make it feel warmer and may cause discomfort.'}
      </p>
    </div>
  );
};

export default HumidityCard;