import React from 'react';
import { useParams } from 'react-router-dom';

const CityDetail = ({ data }) => {
  const { cityName } = useParams();
  const cityData = data.find(city => city.location.name === cityName);

  if (!cityData) return <p>City not found</p>;

  return (
    <div>
      <h2>{cityData.location.name}</h2>
      <p>Temperature: {cityData.current.temp_c}°C</p>
      <p>Condition: {cityData.current.condition.text}</p>
      <p>Humidity: {cityData.current.humidity}%</p>
      <p>Wind Speed: {cityData.current.wind_kph} km/h</p>
      {/* Add more details if needed */}
    </div>
  );
};

export default CityDetail;
