import React from 'react';

const AQICard = ({ data, theme }) => {
  const aqi = data.current.air_quality?.['us-epa-index'] || 1;
  
  // Function to determine AQI level
  const getAQILevel = (index) => {
    switch(index) {
      case 1: return { level: 'Good', color: 'bg-green-500', text: 'text-green-500' };
      case 2: return { level: 'Moderate', color: 'bg-yellow-500', text: 'text-yellow-500' };
      case 3: return { level: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500', text: 'text-orange-500' };
      case 4: return { level: 'Unhealthy', color: 'bg-red-500', text: 'text-red-500' };
      case 5: return { level: 'Very Unhealthy', color: 'bg-purple-500', text: 'text-purple-500' };
      case 6: return { level: 'Hazardous', color: 'bg-gray-800', text: 'text-gray-800' };
      default: return { level: 'Unknown', color: 'bg-gray-500', text: 'text-gray-500' };
    }
  };
  
  const { level, color, text } = getAQILevel(aqi);
  
  // Determine background color for progress bar based on theme
  const progressBgColor = theme.cardBg === 'bg-gray-800/90' ? 'bg-gray-700' : 'bg-gray-200';
  const textColorMuted = theme.cardBg === 'bg-gray-800/90' ? 'text-gray-400' : 'text-gray-500';
  
  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-4 transition-colors duration-300`}>
      <h3 className={`text-lg font-semibold mb-3 ${theme.textColor}`}>Air Quality</h3>
      <div className="flex flex-col">
        <p className={`text-3xl font-bold ${theme.textColor}`}>{aqi}</p>
        <p className={`text-sm ${text} mb-2`}>{level}</p>
        
        <div className={`w-full ${progressBgColor} rounded-full h-2.5 mt-2`}>
          <div 
            className={`${color} h-2.5 rounded-full`} 
            style={{ width: `${(aqi / 6) * 100}%` }}
          ></div>
        </div>
        
        <div className={`flex justify-between text-xs ${textColorMuted} mt-1`}>
          <span>Good</span>
          <span>Moderate</span>
          <span>Unhealthy</span>
          <span>Hazardous</span>
        </div>
      </div>
      
      <p className={`text-xs ${textColorMuted} mt-3`}>
        {aqi <= 2 ? 'Air quality is satisfactory, and air pollution poses little or no risk.' :
         aqi <= 3 ? 'Air quality is acceptable. However, some pollutants may be a concern for a small number of people.' :
         aqi <= 4 ? 'Members of sensitive groups may experience health effects.' :
         aqi <= 5 ? 'Everyone may begin to experience health effects.' :
         'Health alert: everyone may experience more serious health effects.'}
      </p>
    </div>
  );
};

export default AQICard;