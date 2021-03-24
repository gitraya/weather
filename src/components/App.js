import Footer from 'components/Footer';
import Aside from './Aside';

function App() {
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
      <div className="container main">
        <header className="header">
          <nav className="nav">
            <div className="icon-temp"></div>
            <div className="icon-temp"></div>
          </nav>
        </header>
        <main className="main"></main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
