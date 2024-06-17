import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherReport, setWeatherReport] = useState('');
  const [openaiResponse, setOpenaiResponse] = useState('');

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await axios.post('http://localhost:8000/get_weather/', {
        city_name: cityName
      });
      setWeatherReport(response.data.weather_report);
      setOpenaiResponse(response.data.openai_response.content);
    } catch (error) {
      console.error("Error fetching weather report:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather and OpenAI Chat</h1>
        <input
          type="text"
          value={cityName}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button onClick={getWeather}>Get Weather and OpenAI Response</button>
        <div>
          <h2>Weather Report:</h2>
          <pre>{weatherReport}</pre>
          <h2>OpenAI Response:</h2>
          <pre>{openaiResponse}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
