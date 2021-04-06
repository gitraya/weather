import { useEffect, useState } from 'react';
import { useLoading, ThreeDots } from '@agney/react-loading';
import Aside from 'components/Aside/Aside';
import Main from 'components/Main/Main.js';

const App = () => {
  const cors_api_url = 'https://cors-anywhere-venky.herokuapp.com/';

  // react state for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });

  // react state for all weather data
  const [allData, setAllData] = useState(null);
  const [todayWeather, setTodayWeather] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [woeid, setWoeid] = useState(1047378);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  // fetching weather data based on woeid
  const fetchingData = async (woeid) => {
    let fetchData;
    setIsLoading(true);
    try {
      const res = await fetch(
        `${cors_api_url}https://www.metaweather.com/api/location/${woeid}`
      );
      fetchData = await res.json();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
    let data;
    try {
      const res = await fetch(
        `${cors_api_url}https://www.metaweather.com/api/location/search/?lattlong=${coords.latitude},${coords.longitude}`
      );
      data = await res.json();
    } catch (error) {
      console.log(error);
    }
    return updateWeatherData(data[0].woeid);
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
    const data = await fetchingData(woeid);
    return getWeatherData(data);
  };

  // convert temperature from celcius to fahrenheit
  const convertTemp = (celcius) => {
    const fahren = parseInt(celcius) * 1.8 + 32;
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
        await navigator.geolocation.getCurrentPosition(getPosition);
        if (!allData) {
          const data = await fetchingData(woeid);
          return getWeatherData(data);
        }
      }
    };
    getAllData();
    isLoading
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'unset');
  });

  return (
    <div className="App">
      {isLoading ? (
        <div className="loadAll" {...containerProps}>
          {indicatorEl}
        </div>
      ) : (
        ''
      )}
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
