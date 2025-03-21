import React from 'react';

const TemperatureCard = ({ data, theme }) => {
  const current = data.current;
  const forecast = data.forecast.forecastday[0];
  
  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-4 transition-colors duration-300`}>
      <h3 className={`text-lg font-semibold mb-3 ${theme.textColor}`}>Temperature</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className={`text-3xl font-bold ${theme.textColor}`}>{current.temp_c}°C</p>
          <p className={`text-sm ${theme.textColor} opacity-75`}>Feels like {current.feelslike_c}°C</p>
        </div>
        <div className="text-right">
          <p className="text-sm">
            <span className="text-red-500">↑ {forecast.day.maxtemp_c}°C</span> / 
            <span className="text-blue-500">↓ {forecast.day.mintemp_c}°C</span>
          </p>
          <p className={`text-xs ${theme.textColor} opacity-75`}>Min/Max</p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureCard;