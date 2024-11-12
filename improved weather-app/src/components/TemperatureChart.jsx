import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TemperatureChart = ({ data }) => {
  // Define temperature thresholds (e.g., below 15°C is considered "cold", above 30°C is "hot")
  const HOT_THRESHOLD = 25;
  const COLD_THRESHOLD = 14;

  // Define colors
  const hotColor = 'rgba(255, 99, 132, 0.6)'; // Red
  const coldColor = 'rgba(54, 162, 235, 0.6)'; // Blue
  const moderateColor = 'rgba(75, 192, 192, 0.6)'; // Green

  const chartData = {
    labels: data.map((cityData) => cityData.location.name),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map((cityData) => cityData.current.temp_c),
        backgroundColor: data.map((cityData) => {
          const temp = cityData.current.temp_c;
          if (temp >= HOT_THRESHOLD) return hotColor;
          if (temp <= COLD_THRESHOLD) return coldColor;
          return moderateColor; // Use a moderate color for temperatures in between
        }),
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default TemperatureChart;
