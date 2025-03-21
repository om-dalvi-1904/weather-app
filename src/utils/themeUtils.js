// Get dynamic theme colors based on time of day
export const getTimeBasedColors = (data) => {
  if (!data) return {
    bgGradient: 'bg-gradient-to-b from-blue-400 to-blue-100',
    cardBg: 'bg-white',
    textColor: 'text-gray-800'
  };

  // Get current hour from the location's local time
  const localTime = new Date(data.location.localtime);
  const hour = localTime.getHours();
  
  // Early morning (5-7 AM)
  if (hour >= 5 && hour < 7) {
    return {
      bgGradient: 'bg-gradient-to-b from-orange-300 to-blue-200',
      cardBg: 'bg-white/90',
      textColor: 'text-gray-800'
    };
  }
  // Morning (7-11 AM)
  else if (hour >= 7 && hour < 11) {
    return {
      bgGradient: 'bg-gradient-to-b from-sky-400 to-blue-100',
      cardBg: 'bg-white/90',
      textColor: 'text-gray-800'
    };
  }
  // Midday (11 AM-3 PM)
  else if (hour >= 11 && hour < 15) {
    return {
      bgGradient: 'bg-gradient-to-b from-blue-500 to-blue-200',
      cardBg: 'bg-white/90',
      textColor: 'text-gray-800'
    };
  }
  // Afternoon (3-6 PM)
  else if (hour >= 15 && hour < 18) {
    return {
      bgGradient: 'bg-gradient-to-b from-blue-400 to-orange-200',
      cardBg: 'bg-white/90',
      textColor: 'text-gray-800'
    };
  }
  // Evening (6-8 PM)
  else if (hour >= 18 && hour < 20) {
    return {
      bgGradient: 'bg-gradient-to-b from-orange-500 to-purple-400',
      cardBg: 'bg-white/90',
      textColor: 'text-gray-800'
    };
  }
  // Night (8 PM-5 AM)
  else {
    return {
      bgGradient: 'bg-gradient-to-b from-gray-900 to-blue-900',
      cardBg: 'bg-gray-800/90',
      textColor: 'text-gray-100'
    };
  }
};