import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Card from './components/Card';
import TemperatureChart from './components/TemperatureChart';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CityDetail from './components/CityDetail'; // New component

// Function to calculate quartiles and range
function calculateQuartilesAndRange(temperatures) {
  if (temperatures.length === 0) return null;

  // Sort temperatures in ascending order
  temperatures.sort((a, b) => a - b);

  const n = temperatures.length;
  const q1 = temperatures[Math.floor((n * 25) / 100)];
  const q2 = temperatures[Math.floor((n * 50) / 100)]; // Median
  const q3 = temperatures[Math.floor((n * 75) / 100)];
  const range = temperatures[n - 1] - temperatures[0]; // Max - Min

  return { q1, q2, q3, range };
}

const App = () => {
  const [cities, setCities] = useState(['New York', 'London', 'Tokyo']); // Predefined cities or start empty for user input
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityInput, setCityInput] = useState('');

  // State for filters
  const [minTemp, setMinTemp] = useState(''); // Minimum temperature filter
  const [maxTemp, setMaxTemp] = useState(''); // Maximum temperature filter
  const [selectedCondition, setSelectedCondition] = useState(''); // Weather condition filter

  const API_KEY = '142e7b22faa54d44a34221223242110'; // Replace with your WeatherAPI key

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setData([]); // Reset data before fetching new cities

      try {
        const promises = cities.map(async (city) => {
          const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
          );
          const result = await response.json();
          if (response.ok) {
            return result;
          } else {
            throw new Error(result.error.message);
          }
        });

        const results = await Promise.all(promises);
        setData(results); // Store all fetched results
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    if (cities.length > 0) {
      fetchData();
    }
  }, [cities]);

  // Add a new city to the list
  const handleAddCity = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setCities((prevCities) => [...prevCities, cityInput]);
      setCityInput(''); // Clear input after adding city
    }
  };

  // Remove a city from the list
  const handleRemoveCity = (cityToRemove) => {
    setCities(cities.filter((city) => city !== cityToRemove));
  };

  // Extract temperature data from the fetched results
  const temperatures = data.map((cityData) => cityData.current.temp_c);

  // Calculate summary statistics
  const totalCities = data.length;
  const meanTemperature =
    temperatures.length > 0
      ? (temperatures.reduce((acc, temp) => acc + temp, 0) / temperatures.length).toFixed(2)
      : 'N/A';

  const quartilesAndRange = calculateQuartilesAndRange(temperatures);

  // Filtered data based on temperature range and weather condition
  const filteredData = data.filter((cityData) => {
    const temp = cityData.current.temp_c;
    const condition = cityData.current.condition.text.toLowerCase();
    const isTempInRange =
      (!minTemp || temp >= parseFloat(minTemp)) &&
      (!maxTemp || temp <= parseFloat(maxTemp));
    const isConditionMatch =
      !selectedCondition || condition === selectedCondition.toLowerCase();

    return isTempInRange && isConditionMatch;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          {/* Main dashboard route */}
          <Route
            path="/"
            element={
              <div className="main-content">
                <NavBar /> 
                <div className="dashboard">
                  {/* Add City Form */}
                  <form onSubmit={handleAddCity}>
                    <input
                      type="text"
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      placeholder="Enter city name"
                    />
                    <button type="submit">Add City</button>
                  </form>
  
                  {/* Filters */}
                  <div>
                    <h4>Filter by Temperature</h4>
                    <label>
                      Min Temp (°C):
                      <input
                        type="number"
                        value={minTemp}
                        onChange={(e) => setMinTemp(e.target.value)}
                      />
                    </label>
                    <label>
                      Max Temp (°C):
                      <input
                        type="number"
                        value={maxTemp}
                        onChange={(e) => setMaxTemp(e.target.value)}
                      />
                    </label>
  
                    <h4>Filter by Weather Condition</h4>
                    <select
                      value={selectedCondition}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                    >
                      <option value="">All Conditions</option>
                      <option value="Sunny">Sunny</option>
                      <option value="Cloudy">Cloudy</option>
                      <option value="Rain">Rain</option>
                      <option value="Mist">Mist</option>
                      <option value="Clear">Clear</option>
                    </select>
                  </div>
  
                  {/* Display Summary Statistics */}
                  <div>
                    <h3>Summary Statistics:</h3>
                    <p>Total Cities: {totalCities}</p>
                    <p>Mean Temperature: {meanTemperature}°C</p>
                    {quartilesAndRange && (
                      <>
                        <p>Q1 (25th percentile): {quartilesAndRange.q1}°C</p>
                        <p>Q2 (50th percentile - Median): {quartilesAndRange.q2}°C</p>
                        <p>Q3 (75th percentile): {quartilesAndRange.q3}°C</p>
                        <p>Temperature Range: {quartilesAndRange.range}°C</p>
                      </>
                    )}
                  </div>
                  <div className="chart-section">
                    <TemperatureChart data={filteredData} />
                  </div>
  
                  {/* Display Weather Data for All Cities */}
                  <div className="card-section">
                    {filteredData.map((cityData, index) => (
                      <div key={index}>
                        <h3>
                          <Link to={`/city/${cityData.location.name}`}>
                            {cityData.location.name}
                          </Link>
                        </h3>
                        <div>
                          <Card
                            value={`${cityData.current.temp_c}°C`}
                            description="Current Temperature"
                          />
                          <Card
                            value={cityData.current.condition.text}
                            description="Weather Condition"
                          />
                          <Card
                            value={`${cityData.current.wind_kph} km/h`}
                            description="Wind Speed"
                          />
                        </div>
                        <button onClick={() => handleRemoveCity(cityData.location.name)}>
                          Remove City
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
  
          {/* City Detail route */}
          <Route
            path="/city/:cityName"
            element={
              <div className="city-detail">
                <Link to="/">← Back to Home</Link> {/* Back to Home link */}
                <CityDetail data={data} />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
  
};
export default App;
