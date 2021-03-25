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
    return;
  };

  const fetchingData = async () => {
    let fetchData;
    await fetch(
      `${cors_api_url}https://www.metaweather.com/api/location/1047378`
    )
      .then((res) => res.json())
      .then((data) => {
        return (fetchData = data);
      })
      .catch((err) => console.log(err));
    return fetchData;
  };

  useEffect(() => {
    const getAllData = async () => {
      if (!allData) {
        let data = await fetchingData();
        return getWeatherData(data);
      }
    };
    getAllData();
  }, [allData]);

  return (
    <div className="App">
      {todayWeather && locationName ? (
        <Aside
          data={todayWeather}
          location={locationName}
          cors={cors_api_url}
        />
      ) : (
        <div></div>
      )}
      <Main data={allData} />
    </div>
  );
};

export default App;
