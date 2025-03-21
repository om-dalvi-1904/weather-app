import React from 'react';

const SunCard = ({ data, theme }) => {
  const astronomy = data.forecast.forecastday[0].astro;
  
  // Calculate current time percentage for the sun position
  const sunrise = astronomy.sunrise;
  const sunset = astronomy.sunset;
  
  // Convert 12-hour format to 24-hour for calculation
  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    
    return { hours: parseInt(hours, 10), minutes: parseInt(minutes, 10) };
  };
  
  const sunriseTime = convertTo24Hour(sunrise);
  const sunsetTime = convertTo24Hour(sunset);
  
  // Get current time
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  
  // Convert all to minutes since midnight
  const sunriseMinutes = sunriseTime.hours * 60 + sunriseTime.minutes;
  const sunsetMinutes = sunsetTime.hours * 60 + sunsetTime.minutes;
  const currentTimeMinutes = currentHours * 60 + currentMinutes;
  
  // Calculate percentage of day passed (from sunrise to sunset)
  let sunPosition = 0;
  if (currentTimeMinutes >= sunriseMinutes && currentTimeMinutes <= sunsetMinutes) {
    sunPosition = ((currentTimeMinutes - sunriseMinutes) / (sunsetMinutes - sunriseMinutes)) * 100;
  } else if (currentTimeMinutes > sunsetMinutes) {
    sunPosition = 100;
  }
  
  // Determine if it's day or night
  const isDaytime = currentTimeMinutes >= sunriseMinutes && currentTimeMinutes <= sunsetMinutes;
  const textColorMuted = theme.cardBg === 'bg-gray-800/90' ? 'text-gray-400' : 'text-gray-500';
  
  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-4 transition-colors duration-300`}>
      <h3 className={`text-lg font-semibold mb-3 ${theme.textColor}`}>Sunrise & Sunset</h3>
      
      <div className="relative h-24 mb-4">
        {/* Sky background */}
        <div className={`absolute inset-0 rounded-lg ${isDaytime ? 'bg-gradient-to-b from-blue-400 to-blue-200' : 'bg-gradient-to-b from-indigo-900 to-purple-800'}`}>
          {/* Sun/Moon */}
          <div 
            className={`absolute bottom-2 h-8 w-8 rounded-full ${isDaytime ? 'bg-yellow-300' : 'bg-gray-200'}`}
            style={{ left: `${sunPosition}%`, transform: 'translateX(-50%)' }}
          ></div>
          
          {/* Horizon */}
          <div className="absolute bottom-0 w-full h-6 bg-gradient-to-b from-transparent to-gray-800 rounded-b-lg"></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className={`text-xs ${textColorMuted}`}>Sunrise</p>
          <p className={`font-semibold ${theme.textColor}`}>{sunrise}</p>
        </div>
        
        <div className="text-center">
          <p className={`text-xs ${textColorMuted}`}>Sunset</p>
          <p className={`font-semibold ${theme.textColor}`}>{sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default SunCard;