import React from 'react';
import TemperatureCard from './TemperatureCard';
import UVIndexCard from './UVIndexCard';
import PrecipitationCard from './PrecipitationCard';
import WindCard from './WindCard';
import VisibilityCard from './VisibilityCard';
import HumidityCard from './HumidityCard';
import AQICard from './AQICard';
import PressureCard from './PressureCard';
import SunCard from './SunCard';
import WeatherChart from './WeatherChart';

const WeatherDetails = ({ data, theme }) => {
  return (
    <div className="space-y-6">
      <WeatherChart data={data} theme={theme} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <TemperatureCard data={data} theme={theme} />
        </div>
        <UVIndexCard data={data} theme={theme} />
        <HumidityCard data={data} theme={theme} />
        <WindCard data={data} theme={theme} />
        <PrecipitationCard data={data} theme={theme} />
        <VisibilityCard data={data} theme={theme} />
        <div className="sm:col-span-2 lg:col-span-1">
          <SunCard data={data} theme={theme} />
        </div>
        <AQICard data={data} theme={theme} />
        <PressureCard data={data} theme={theme} />
      </div>
    </div>
  );
};

export default WeatherDetails;