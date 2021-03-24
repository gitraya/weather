import { useEffect, useState } from 'react';
import Aside from 'components/Aside';
import Main from 'components/Main.js';

const App = () => {
  const cors_api_url = 'https://cors-anywhere.herokuapp.com/';

  const [allData, setAllData] = useState(null);
  const [todayWeather, setTodayWeather] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [woeid, setWoeid] = useState(null);

  const getWeatherData = (data) => {
    setAllData(data);
    setTodayWeather(data.consolidated_weather[0]);
    setLocationName(data.title);
    setWoeid(data.woeid);
  };

  const fetchingData = async () => {
    await fetch(
      `${cors_api_url}https://www.metaweather.com/api/location/1047378`
    )
      .then((res) => res.json())
      .then((data) => {
        getWeatherData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!allData) return fetchingData();
  });
  console.log(todayWeather);
  return (
    <div className="App">
      <Aside data={todayWeather} />
      <Main data={allData} />
    </div>
  );
};

export default App;
