import './App.css';
import axios from 'axios';
import { useState } from 'react';

  function App() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=97d54f6f736bc4d9d7014516da54aa0c`
  
    const searchLocation = (event) => {
      if (event.key === 'Enter') {
        axios.get(url).then((response) => {
          setData(response.data)
          console.log(response.data)
        })
        setLocation('')
      }
    }
  
    return (
      <div className="app">
        <div className="search">
          <h1>Type you city</h1>
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              {data.main ? <h1>City: {data.name}</h1> : null }
            </div>
            <div className="temp">
              {data.main ? <h1>Temperature: {data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <h1>Sky:{data.weather[0].main}</h1> : null}
            </div>
          </div> 
        </div>
      </div>
    );
  }
  
  export default App;
