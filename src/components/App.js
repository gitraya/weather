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
  const [woeid, setWoeid] = useState(1047378);
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
        let data = await fetchingData(woeid);
        return getWeatherData(data);
      }
    };
    getAllData();
  }, [allData, woeid]);

  return (
    <div className="App">
      {todayWeather && locationName ? (
        <Aside
          data={todayWeather}
          location={locationName}
          cors={cors_api_url}
          searchHandle={updateWeatherData}
          temp={{ isFahrenheit, convertTemp }}
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
