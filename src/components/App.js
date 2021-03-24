import Aside from 'components/Aside';
import Main from 'components/Main.js';

const App = () => {
  const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  const fetchingData = () => {
    fetch(`${cors_api_url}https://www.metaweather.com/api/location/1047378`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Aside />
      <Main />
    </div>
  );
};

export default App;
