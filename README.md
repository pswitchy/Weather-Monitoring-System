# Weather Monitoring System

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Usage](#usage)
7. [Components](#components)
8. [API Integration](#api-integration)
9. [Testing](#testing)
10. [Contributing](#contributing)

## Introduction

The Weather Monitoring System is a real-time data processing application designed to monitor weather conditions across multiple cities in India. It provides summarized insights using rollups and aggregates, offering users an intuitive interface to track current weather conditions, view historical trends, and receive alerts for extreme weather events.

## Features

- Real-time weather data retrieval from OpenWeatherMap API
- Display of current weather conditions for multiple cities
- Daily weather summaries with temperature trends
- Configurable alerting system for extreme weather conditions
- Interactive charts for visualizing weather data
- Responsive design for various device sizes

## Technologies Used

- React.js (v18.3.1)
- Material-UI (MUI v5)
- Chart.js and react-chartjs-2 for data visualization
- Axios for API requests
- Jest and React Testing Library for testing

## Project Structure

```
weather-monitoring-system/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── WeatherDashboard.js
│   │   ├── DailySummary.js
│   │   └── AlertSystem.js
│   ├── utils/
│   │   └── weatherUtils.js
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── config.js
│   └── setupTests.js
├── package.json
├── README.md
└── .gitignore
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/pswitchy/Weather-Monitoring-System.git
   cd weather-monitoring-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

After starting the application, you will see the main dashboard displaying current weather conditions for the configured cities. The daily summary section shows temperature trends over time, and the alert system notifies you of any extreme weather conditions.

To configure the cities monitored or adjust alert thresholds, modify the `src/config.js` file.

## Components

### WeatherDashboard

Displays current weather conditions for each monitored city, including temperature, feels-like temperature, and weather condition icons.

### DailySummary

Shows a line chart of daily temperature trends (average, maximum, and minimum) and the dominant weather condition for the day.

### AlertSystem

Manages and displays weather alerts based on configurable thresholds.

## API Integration

This project uses the OpenWeatherMap API to fetch real-time weather data. The API calls are managed in the `src/utils/weatherUtils.js` file. Make sure to replace the API key in the `.env` file with your own key from OpenWeatherMap.

## Testing

Run the test suite using:

```
npm test
```

This will run all tests defined in files with the `.test.js` extension.

## Contributing

Contributions to the Weather Monitoring System are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

For any additional questions or support, please open an issue in the GitHub repository.
