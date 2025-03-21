const API_KEY = 'abb3e7da5dff4fe9998135612252103'; // Replace with your actual API key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};