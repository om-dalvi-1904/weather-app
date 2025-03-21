import React from 'react';

const WindCard = ({ data, theme }) => {
  const current = data.current;
  
  // Function to convert wind direction degrees to cardinal direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };
  
  const windDirection = getWindDirection(current.wind_degree);
  const textColorMuted = theme.cardBg === 'bg-gray-800/90' ? 'text-gray-400' : 'text-gray-500';
  const borderColor = theme.cardBg === 'bg-gray-800/90' ? 'border-gray-700' : 'border-gray-200';
  
  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-4 transition-colors duration-300`}>
      <h3 className={`text-lg font-semibold mb-3 ${theme.textColor}`}>Wind</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className={`text-3xl font-bold ${theme.textColor}`}>{current.wind_kph} km/h</p>
          <p className={`text-sm ${textColorMuted}`}>{windDirection} direction</p>
        </div>
        <div className="relative h-16 w-16">
          {/* Wind direction indicator */}
          <div className={`absolute inset-0 rounded-full border-2 ${borderColor}`}></div>
          <div 
            className="absolute w-1 h-8 bg-blue-500 rounded-full"
            style={{ 
              top: '50%', 
              left: '50%', 
              transformOrigin: 'bottom center',
              transform: `translate(-50%, -100%) rotate(${current.wind_degree}deg)`
            }}
          ></div>
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs ${theme.textColor}`}>N</div>
          <div className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-xs ${theme.textColor}`}>E</div>
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-xs ${theme.textColor}`}>S</div>
          <div className={`absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs ${theme.textColor}`}>W</div>
        </div>
      </div>
      <div className="mt-2">
        <p className={`text-sm ${theme.textColor}`}>Gusts: {current.gust_kph} km/h</p>
      </div>
    </div>
  );
};

export default WindCard;