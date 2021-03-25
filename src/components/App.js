import { useEffect, useState } from 'react';
import Aside from 'components/Aside';
import Main from 'components/Main.js';

const App = () => {
  const cors_api_url = 'https://cors-anywhere-venky.herokuapp.com/';

  // react state for all weather data
  const [allData, setAllData] = useState(null);
  const [todayWeather, setTodayWeather] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [woeid, setWoeid] = useState(null);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  // fetching weather data based on woeid
  const fetchingData = async (woeid) => {
    let fetchData;
    await fetch(
      `${cors_api_url}https://www.metaweather.com/api/location/${woeid}`
    )
      .then((res) => res.json())
      .then((data) => {
        return (fetchData = data);
      })
      .catch((err) => console.log(err));
    return fetchData;
  };

  // ask and get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      alert('Cannot find your location!');
    }
  };

  // get user position and update weather data by user position
  const getPosition = async ({ coords }) => {
    await fetch(
      `${cors_api_url}https://www.metaweather.com/api/location/search/?lattlong=${coords.latitude},${coords.longitude}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          return updateWeatherData(data[0].woeid);
        } else {
          alert('Cannot find your location!');
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  // get and set weather data
  const getWeatherData = (data) => {
    setAllData(data);
    setTodayWeather(data.consolidated_weather[0]);
    setWeeklyWeather(data.consolidated_weather);
    setLocationName(data.title);
    setWoeid(data.woeid);
    return;
  };

  // update weather data while user search by location
  const updateWeatherData = async (woeid) => {
    setWoeid(woeid);
    let data = await fetchingData(woeid);
    return getWeatherData(data);
  };

  // convert temperature from celcius to fahrenheit
  const convertTemp = (celcius) => {
    let fahren = parseInt(celcius) * 1.8 + 32;
    return fahren;
  };

  // change the temperature from celsius to fahrenheit and vice versa
  const changeTemp = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  // react use effect get data from metaweather api
  useEffect(() => {
    const getAllData = async () => {
      if (!allData) {
        await getUserLocation();
      } else if (!allData) {
        let data = await fetchingData(1047378);
        return getWeatherData(data);
      }
    };
    getAllData();
  });

  return (
    <div className="App">
      {todayWeather && locationName ? (
        <Aside
          data={todayWeather}
          location={locationName}
          cors={cors_api_url}
          searchHandle={updateWeatherData}
          temp={{ isFahrenheit, convertTemp }}
          position={getUserLocation}
        />
      ) : (
        <div></div>
      )}
      {todayWeather && weeklyWeather ? (
        <Main
          data={weeklyWeather}
          todaysData={todayWeather}
          temp={{ isFahrenheit, changeTemp, convertTemp }}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default App;
