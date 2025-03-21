import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { getTimeBasedColors } from './utils/themeUtils';

// Import components
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { weatherData, loading, error, setLocation } = useWeather('Pune');

  // Get dynamic theme colors based on time of day
  const theme = getTimeBasedColors(weatherData);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(searchQuery);
    }
  };

  return (
    <div className={`min-h-screen ${theme.bgGradient} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold text-center mb-8 ${theme.textColor}`}>
          {weatherData ? `${weatherData.location.name}, ${weatherData.location.country}` : 'Weather App'}
        </h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location..."
            className={`px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md ${theme.cardBg === 'bg-gray-800/90' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>

        {/* Loading Animation */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent animate-spin`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className={`w-8 h-8 ${theme.textColor}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <p className={`ml-4 text-lg ${theme.textColor}`}>Loading weather data...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center p-6 bg-red-100 rounded-lg border border-red-300 mb-8">
            <p className="text-red-600 font-medium">{error}</p>
            <p className="text-red-500 text-sm mt-2">Please try another location or check your connection.</p>
          </div>
        )}
        
        {weatherData && !loading && (
          <div className="space-y-8">
            <CurrentWeather data={weatherData} theme={theme} />
            <WeatherDetails data={weatherData} theme={theme} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
