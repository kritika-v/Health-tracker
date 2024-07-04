import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const HealthAnalytics = ({ healthData }) => {
  const dates = healthData.map(data => data.date);
  const steps = healthData.map(data => data.steps);
  const calories = healthData.map(data => data.calories);
  const sleep = healthData.map(data => data.sleep);

  const stepData = {
    labels: dates,
    datasets: [
      {
        label: 'Steps',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: steps,
      }
    ]
  };

  const calorieData = {
    labels: dates,
    datasets: [
      {
        label: 'Calories',
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.6)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: calories,
      }
    ]
  };

  const sleepData = {
    labels: dates,
    datasets: [
      {
        label: 'Sleep (hours)',
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153,102,255,0.6)',
        hoverBorderColor: 'rgba(153,102,255,1)',
        data: sleep,
      }
    ]
  };

  return (
    <div className="health-analytics">
      <h2>Health Analytics</h2>
      <div>
        <h3>Steps</h3>
        <Bar data={stepData} />
      </div>
      <div>
        <h3>Calories</h3>
        <Bar data={calorieData} />
      </div>
      <div>
        <h3>Sleep</h3>
        <Line data={sleepData} />
      </div>
    </div>
  );
};

export default HealthAnalytics;
