// src/App.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import { API_KEY, CITIES } from './config';

jest.mock('axios');

const mockWeatherData = {
  name: 'Delhi',
  main: { temp: 300.15, feels_like: 305.15 },
  weather: [{ main: 'Clear' }],
  dt: 1635139200
};

describe('Weather Monitoring App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    axios.get.mockResolvedValue({ data: mockWeatherData });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Weather Monitoring System/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('fetches and displays weather data', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(axios.get).toHaveBeenCalledTimes(CITIES.length);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`appid=${API_KEY}`)
    );

    const temperatureElement = await screen.findByText(/Temperature:/);
    expect(temperatureElement).toBeInTheDocument();
  });

  test('updates weather data periodically', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(axios.get).toHaveBeenCalledTimes(CITIES.length);

    act(() => {
      jest.advanceTimersByTime(300000); // 5 minutes
    });

    expect(axios.get).toHaveBeenCalledTimes(CITIES.length * 2);
  });

  test('displays alerts when temperature threshold is exceeded', async () => {
    const highTempMockData = {
      ...mockWeatherData,
      main: { temp: 310.15, feels_like: 315.15 } // 37°C
    };
    axios.get.mockResolvedValue({ data: highTempMockData });

    await act(async () => {
      render(<App />);
    });

    act(() => {
      jest.advanceTimersByTime(300000); // 5 minutes
    });

    const alertElement = await screen.findByText(/High temperature alert/);
    expect(alertElement).toBeInTheDocument();
  });
});
