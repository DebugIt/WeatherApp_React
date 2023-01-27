import './App.css';
import React, { useState , useEffect } from 'react';
import { Card } from './Components/Card';
import { Footer } from './Components/Footer';

function App() {

  const [value, setvalue] = useState("Thane");
  const [info, setInfo] = useState({});

  const getweatherData = async () => {
    try {
      // 7bac15a96b018cfb595440d72dd04506
      let API_key = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=7bac15a96b018cfb595440d72dd04506`;
      const res = await fetch(API_key);
      const weather_Data = await res.json();

      const { temp, humidity, pressure, temp_min, temp_max } = weather_Data.main;
      const { speed } = weather_Data.wind;
      const { country, sunrise, sunset  } = weather_Data.sys;
      const { name } = weather_Data;

      // destructuring and renaming an element of array of an objject
      const { main: mood } = weather_Data.weather[0];


      // creating a object to get data out of the func.
      const weatherInfo0 = {
        temp, 
        humidity, 
        pressure, 
        temp_min, 
        temp_max,
        speed,
        country, 
        sunrise, 
        sunset,
        mood,
        name
        
      };

      setInfo(weatherInfo0);

      
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => { 
    getweatherData();
   }, []);
  

  return (
    <>
      <div className="Heading">
        <h1>Weather App</h1>
      </div>

      <br />

      <div className="ioField">
        <input type="text" id='srchBar' placeholder='search here...' value={value} onChange={ (e) => {setvalue(e.target.value)} }/>
        <div>
        <button id='btn' onClick={getweatherData}>
            <span className='material-symbols-outlined'>search</span>
          </button>
        </div>
      </div>
      
      
      <br />

      <Card info={info}/>
      
      <Footer />


    </>
  );
}



export default App;
