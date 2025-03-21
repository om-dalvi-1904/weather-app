import React from 'react';

const WeatherChart = ({ data, theme }) => {
  const forecast = data.forecast.forecastday;
  
  // Get hourly forecast for the next 24 hours
  const getHourlyForecast = () => {
    const hourlyData = [];
    const currentHour = new Date().getHours();
    
    // Get remaining hours from today
    const todayHours = forecast[0].hour.slice(currentHour);
    hourlyData.push(...todayHours);
    
    // If we need more hours, get from tomorrow
    if (hourlyData.length < 24 && forecast.length > 1) {
      const tomorrowHours = forecast[1].hour.slice(0, 24 - hourlyData.length);
      hourlyData.push(...tomorrowHours);
    }
    
    return hourlyData.slice(0, 24);
  };
  
  const hourlyForecast = getHourlyForecast();
  
  // Find min and max temperature for scaling
  const temperatures = hourlyForecast.map(hour => hour.temp_c);
  const minTemp = Math.floor(Math.min(...temperatures)) - 1; // Add padding
  const maxTemp = Math.ceil(Math.max(...temperatures)) + 1; // Add padding
  const tempRange = maxTemp - minTemp;
  
  // Function to format time from date string
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', hour12: true });
  };
  
  // Generate intermediate temperature lines
  const generateTempLines = () => {
    const lines = [];
    const step = Math.ceil(tempRange / 4); // Create 4 divisions
    
    for (let temp = minTemp; temp <= maxTemp; temp += step) {
      const position = 100 - ((temp - minTemp) / tempRange) * 100;
      lines.push({ temp, position });
    }
    
    return lines;
  };
  
  const tempLines = generateTempLines();
  
  // Determine chart colors based on theme
  const chartLineColor = theme.cardBg === 'bg-gray-800/90' ? '#60a5fa' : '#3b82f6';
  const chartTextColor = theme.cardBg === 'bg-gray-800/90' ? 'text-gray-300' : 'text-gray-500';
  const chartGridColor = theme.cardBg === 'bg-gray-800/90' ? 'border-gray-700' : 'border-gray-200';
  const chartPointBg = theme.cardBg === 'bg-gray-800/90' ? 'bg-gray-800' : 'bg-white';
  const chartPointBorder = theme.cardBg === 'bg-gray-800/90' ? 'border-blue-400' : 'border-blue-500';
  const chartXAxisText = theme.cardBg === 'bg-gray-800/90' ? 'text-gray-300' : 'text-gray-600';
  
  return (
    <div className={`${theme.cardBg} rounded-xl shadow-md p-6 transition-colors duration-300`}>
      <h3 className={`text-xl font-semibold mb-4 ${theme.textColor}`}>24-Hour Temperature Forecast</h3>
      
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Y-axis label */}
          <div className="flex items-center mb-2">
            <div className={`w-10 text-xs font-medium ${chartTextColor} text-right pr-2`}>°C</div>
            <div className="flex-grow"></div>
          </div>
          
          {/* Temperature chart */}
          <div className="flex">
            {/* Y-axis */}
            <div className="w-10 relative mr-2">
              {tempLines.map((line, index) => (
                <div 
                  key={index} 
                  className={`absolute right-0 text-xs ${chartTextColor} transform -translate-y-1/2`}
                  style={{ top: `${line.position}%` }}
                >
                  {line.temp}
                </div>
              ))}
            </div>
            
            {/* Chart area */}
            <div className={`flex-grow relative h-48 mb-6 border-l border-b ${chartGridColor}`}>
              {/* Temperature grid lines */}
              {tempLines.map((line, index) => (
                <div 
                  key={index} 
                  className={`absolute w-full border-t ${chartGridColor}`}
                  style={{ top: `${line.position}%` }}
                ></div>
              ))}
              
              {/* Temperature curve with gradient */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={theme.cardBg === 'bg-gray-800/90' ? '#ef4444' : '#ef4444'} />
                    <stop offset="50%" stopColor={theme.cardBg === 'bg-gray-800/90' ? '#60a5fa' : '#3b82f6'} />
                    <stop offset="100%" stopColor={theme.cardBg === 'bg-gray-800/90' ? '#1e40af' : '#1e40af'} />
                  </linearGradient>
                </defs>
                
                {/* Area under the curve */}
                <path
                  d={`
                    M0,${100 - ((hourlyForecast[0].temp_c - minTemp) / tempRange) * 100}
                    ${hourlyForecast.map((hour, index) => {
                      const x = (index / (hourlyForecast.length - 1)) * 100;
                      const y = 100 - ((hour.temp_c - minTemp) / tempRange) * 100;
                      return `L${x},${y}`;
                    }).join(' ')}
                    L100,100 L0,100 Z
                  `}
                  fill="url(#tempGradient)"
                  fillOpacity="0.2"
                />
                
                {/* Temperature line */}
                <polyline
                  points={hourlyForecast.map((hour, index) => {
                    const x = (index / (hourlyForecast.length - 1)) * 100;
                    const y = 100 - ((hour.temp_c - minTemp) / tempRange) * 100;
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke={chartLineColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              {/* Temperature points */}
              <div className="absolute inset-0 flex justify-between">
                {hourlyForecast.map((hour, index) => {
                  const top = `${100 - ((hour.temp_c - minTemp) / tempRange) * 100}%`;
                  return (
                    <div key={index} className="relative flex flex-col items-center" style={{ height: '100%' }}>
                      <div 
                        className={`absolute w-3 h-3 ${chartPointBg} border-2 ${chartPointBorder} rounded-full transform -translate-x-1.5 hover:w-4 hover:h-4 hover:border-blue-600 transition-all duration-200`}
                        style={{ top }}
                        title={`${hour.temp_c}°C at ${formatTime(hour.time)}`}
                      ></div>
                    </div>
                  );
                })}
              </div>
              
              {/* Vertical time markers */}
              <div className="absolute inset-x-0 bottom-0 flex justify-between">
                {hourlyForecast.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-2 border-l ${chartGridColor}`}
                    style={{ 
                      left: `${(index / (hourlyForecast.length - 1)) * 100}%`,
                      transform: 'translateX(-50%)'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* X-axis (Time) */}
          <div className="flex ml-12">
            <div className="flex-grow">
              <div className="flex justify-between">
                {hourlyForecast.map((hour, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center"
                    style={{ 
                      width: `${100 / hourlyForecast.length}%`,
                      maxWidth: '60px'
                    }}
                  >
                    <img 
                      src={hour.condition.icon} 
                      alt={hour.condition.text}
                      className="w-8 h-8 mb-1"
                      title={hour.condition.text}
                    />
                    <p className={`text-xs font-medium ${chartXAxisText}`}>
                      {formatTime(hour.time)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-end">
        <div className={`flex items-center text-xs ${chartTextColor}`}>
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
          <span>Temperature (°C)</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;