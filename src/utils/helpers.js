// Format temperature
export const formatTemperature = (temp) => {
  return `${Math.round(temp)}°C`;
};

// Format date
export const formatDate = (dateString) => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format time
export const formatTime = (timeString) => {
  return new Date(timeString).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

// Get weather icon based on condition code
export const getWeatherIcon = (code, isDay) => {
  // This would be expanded with a full mapping of condition codes to icons
  // For now, we'll use the API-provided icons
  return null;
};

// Calculate day length in hours and minutes
export const calculateDayLength = (sunrise, sunset) => {
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
  
  // Convert to minutes
  const sunriseMinutes = sunriseTime.hours * 60 + sunriseTime.minutes;
  const sunsetMinutes = sunsetTime.hours * 60 + sunsetTime.minutes;
  
  // Calculate difference
  let dayLengthMinutes = sunsetMinutes - sunriseMinutes;
  if (dayLengthMinutes < 0) {
    dayLengthMinutes += 24 * 60; // Add a full day if sunset is on the next day
  }
  
  const hours = Math.floor(dayLengthMinutes / 60);
  const minutes = dayLengthMinutes % 60;
  
  return `${hours}h ${minutes}m`;
};