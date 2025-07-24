import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

type Weather = {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
};

type ForecastItem = {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

export const WeatherWidget: React.FC = () => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [city, setCity] = useState<string>('london');
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeatherData = async (cityName: string) => {
    setCity(cityName);
    try {
      setLoading(true);
      setError(null);

      // Fetch current weather
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityName
      )}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = (await response.json()) as Weather;
      setWeatherData(data);

      // Fetch forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          cityName
        )}&appid=${API_KEY}&units=metric`
      );
      if (!forecastResponse.ok) {
        throw new Error('Could not fetch forecast');
      }
      const forecastData = (await forecastResponse.json()) as {
        list: ForecastItem[];
      };

      // Take one forecast item per day (every 8th item, since data is 3-hourly)
      const dailyForecast = forecastData.list.filter(
        (_, index) => index % 8 === 0
      );
      setForecast(dailyForecast);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Could not fetch data, please try again!');
      }
      setWeatherData(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim() === '') {
      setError('Please enter a city name.');
      return;
    }
    fetchWeatherData(searchInput);
    setSearchInput('');
  };

  if (loading)
    return (
      <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-lg text-lg text-gray-700">
        Loading...
      </div>
    );

  if (
    !weatherData ||
    !weatherData.main ||
    !weatherData.weather ||
    forecast.length === 0
  )
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
        <form
          onSubmit={handleSearch}
          className="mb-4 flex space-x-2 justify-center"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg transition"
          >
            Search
          </button>
        </form>
        {error && (
          <p className="text-center text-red-600 font-semibold mb-4">{error}</p>
        )}
        <p className="text-center text-gray-600">No data available.</p>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
      <form
        onSubmit={handleSearch}
        className="mb-6 flex space-x-3 justify-center"
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city name"
          aria-label="City name"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg transition"
        >
          Search
        </button>
      </form>
      {error && (
        <p className="text-center text-red-600 font-semibold mb-4">{error}</p>
      )}

      {/* Current Weather */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">{weatherData.name}</h1>
        <p className="text-6xl font-mono font-extrabold text-blue-600">
          {Math.floor(weatherData.main.temp)}°C
        </p>
        <p className="text-xl capitalize text-gray-700">
          {weatherData.weather[0].main}
        </p>
      </div>

      <div className="flex justify-around mb-6 text-center text-gray-700">
        <div>
          <p className="text-sm font-medium">Humidity</p>
          <p className="text-lg font-semibold">
            {Math.round(weatherData.main.humidity)}%
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Wind Speed</p>
          <p className="text-lg font-semibold">
            {Math.round(weatherData.wind.speed)} mph
          </p>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center text-blue-800">
          5-Day Forecast
        </h2>
        <div className="flex justify-between space-x-2">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="flex-1 bg-blue-50 rounded-lg p-3 flex flex-col items-center shadow-sm"
            >
              <p className="text-sm font-medium text-gray-800 mb-1">
                {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                  weekday: 'short',
                })}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                width={48}
                height={48}
                className="mb-2"
              />
              <p className="text-lg font-semibold text-blue-700">
                {Math.round(day.main.temp)}°C
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
