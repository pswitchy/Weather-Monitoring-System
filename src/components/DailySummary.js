// src/components/DailySummary.js
import React from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const ChartContainer = styled('div')({
  height: 400,
  width: '100%',
});

const DailySummary = ({ summaries }) => {
  const data = Object.entries(summaries).map(([date, summary]) => ({
    date,
    avgTemp: summary.avgTemp,
    maxTemp: summary.maxTemp,
    minTemp: summary.minTemp,
  }));

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Daily Weather Summary
        </Typography>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgTemp" stroke="#8884d8" name="Average Temperature" />
              <Line type="monotone" dataKey="maxTemp" stroke="#82ca9d" name="Max Temperature" />
              <Line type="monotone" dataKey="minTemp" stroke="#ffc658" name="Min Temperature" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
          Dominant weather condition: {Object.values(summaries)[Object.values(summaries).length - 1]?.dominantCondition}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default DailySummary;