import React from 'react';

const PrecipitationCard = ({ data, theme }) => {
  const current = data.current;
  const forecast = data.forecast.forecastday[0].day;
  
  // Determine background color for progress bar based on theme
  const progressBgColor = theme.cardBg === 'bg-gray-800/90' ? 'bg-gray-700' : 'bg-gray-200';
  const textColorMuted = theme.cardBg === 'bg-gray-800/90' ? 'text-gray-400' : 'text-gray-500';
  
  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-4 transition-colors duration-300`}>
      <h3 className={`text-lg font-semibold mb-3 ${theme.textColor}`}>Precipitation</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className={`text-3xl font-bold ${theme.textColor}`}>{current.precip_mm} mm</p>
          <p className={`text-sm ${textColorMuted}`}>Last hour</p>
        </div>
        <div className="text-right">
          <p className="text-sm">
            <span className="text-blue-500">{forecast.totalprecip_mm} mm</span>
          </p>
          <p className={`text-xs ${textColorMuted}`}>Expected today</p>
        </div>
      </div>
      
      {/* Precipitation chance visualization */}
      <div className="mt-4">
        <p className={`text-sm ${theme.textColor} mb-1`}>Chance of rain: {forecast.daily_chance_of_rain}%</p>
        <div className={`w-full ${progressBgColor} rounded-full h-2.5`}>
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${forecast.daily_chance_of_rain}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PrecipitationCard;