import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weatherService';

export const useWeather = (defaultLocation = 'Pune') => {
  const [location, setLocation] = useState(defaultLocation);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(location);
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [location]);

  return { weatherData, loading, error, setLocation };
};