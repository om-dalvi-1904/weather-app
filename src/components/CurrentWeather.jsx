import React from 'react';

const CurrentWeather = ({ data, theme }) => {
  const current = data.current;
  const location = data.location;

  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-6 transition-colors duration-300`}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${theme.textColor}`}>{location.name}, {location.region}</h2>
          <p className={`${theme.textColor} opacity-75`}>{location.country}</p>
          <p className={`text-sm ${theme.textColor} opacity-75`}>
            {new Date(location.localtime).toLocaleString()}
          </p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <img 
            src={current.condition.icon} 
            alt={current.condition.text}
            className="w-20 h-20"
          />
          <div className="ml-4">
            <div className={`text-5xl font-bold ${theme.textColor}`}>{current.temp_c}°C</div>
            <p className={theme.textColor}>{current.condition.text}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center">
          <p className={`${theme.textColor} opacity-75`}>Feels Like</p>
          <p className={`font-semibold ${theme.textColor}`}>{current.feelslike_c}°C</p>
        </div>
        <div className="text-center">
          <p className={`${theme.textColor} opacity-75`}>Wind</p>
          <p className={`font-semibold ${theme.textColor}`}>{current.wind_kph} km/h</p>
        </div>
        <div className="text-center">
          <p className={`${theme.textColor} opacity-75`}>Humidity</p>
          <p className={`font-semibold ${theme.textColor}`}>{current.humidity}%</p>
        </div>
        <div className="text-center">
          <p className={`${theme.textColor} opacity-75`}>UV Index</p>
          <p className={`font-semibold ${theme.textColor}`}>{current.uv}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;