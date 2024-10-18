// src/components/WeatherDashboard.js
import React from 'react';
import { Grid, Card, CardContent, Typography, styled } from '@mui/material';
import { WbSunny, AcUnit, Cloud, Opacity, Thunderstorm, Grain, Waves } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const WeatherIcon = styled('div')(({ theme }) => ({
  fontSize: 48,
  marginBottom: theme.spacing(2),
}));

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <WbSunny />;
    case 'snow':
      return <AcUnit />;
    case 'rain':
    case 'drizzle':
      return <Opacity />;
    case 'thunderstorm':
      return <Thunderstorm />;
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
      return <Grain />;
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado':
      return <Waves />;
    default:
      return <Cloud />;
  }
};

const WeatherDashboard = ({ data }) => {
  return (
    <Grid container spacing={3}>
      {Object.entries(data).map(([city, cityData]) => (
        <Grid item xs={12} sm={6} md={4} key={city}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {city}
              </Typography>
              <WeatherIcon>
                {getWeatherIcon(cityData.main)}
              </WeatherIcon>
              <Typography variant="h4" component="p">
                {cityData.temp.toFixed(1)}°C
              </Typography>
              <Typography color="textSecondary">
                Feels like: {cityData.feels_like.toFixed(1)}°C
              </Typography>
              <Typography variant="body2" component="p">
                {cityData.main}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeatherDashboard;