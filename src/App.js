// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Snackbar, Typography, styled } from '@mui/material';
import { Alert } from '@mui/material';
import WeatherDashboard from './components/WeatherDashboard';
import DailySummary from './components/DailySummary';
import AlertSystem from './components/AlertSystem';
import { fetchWeatherData, processWeatherData } from './utils/weatherUtils';
import { CITIES, API_KEY, FETCH_INTERVAL } from './config';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [dailySummaries, setDailySummaries] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(CITIES, API_KEY);
        const processedData = processWeatherData(data);
        setWeatherData(processedData);
        updateDailySummaries(processedData);
        checkAlerts(processedData);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again later.');
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, FETCH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const updateDailySummaries = (data) => {
    const today = new Date().toISOString().split('T')[0];
    const newSummary = Object.values(data).reduce((acc, cityData) => {
      if (!acc.temps) acc.temps = [];
      acc.temps.push(cityData.temp);
      if (!acc.conditions) acc.conditions = {};
      acc.conditions[cityData.main] = (acc.conditions[cityData.main] || 0) + 1;
      return acc;
    }, {});

    setDailySummaries(prevSummaries => ({
      ...prevSummaries,
      [today]: {
        avgTemp: newSummary.temps.reduce((a, b) => a + b, 0) / newSummary.temps.length,
        maxTemp: Math.max(...newSummary.temps),
        minTemp: Math.min(...newSummary.temps),
        dominantCondition: Object.entries(newSummary.conditions).sort((a, b) => b[1] - a[1])[0][0]
      }
    }));
  };

  const checkAlerts = (data) => {
    const newAlerts = [];
    Object.entries(data).forEach(([city, cityData]) => {
      if (cityData.temp > 35) {  // Using a fixed threshold for this example
        newAlerts.push({
          message: `High temperature alert in ${city}: ${cityData.temp.toFixed(1)}°C`,
          time: Date.now()
        });
      }
    });
    if (newAlerts.length > 0) {
      setAlerts(prevAlerts => [...prevAlerts, ...newAlerts]);
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <StyledTitle variant="h3" component="h1">
        Weather Monitoring System
      </StyledTitle>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <WeatherDashboard data={weatherData} />
          <DailySummary summaries={dailySummaries} />
          <AlertSystem alerts={alerts} />
        </>
      )}
      <Snackbar 
        open={alerts.length > 0} 
        autoHideDuration={6000} 
        onClose={() => setAlerts(prevAlerts => prevAlerts.slice(1))}
      >
        <Alert severity="warning" onClose={() => setAlerts(prevAlerts => prevAlerts.slice(1))}>
          {alerts[0]?.message}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default App;