import Footer from 'components/Footer';
import cloudBackground from 'images/Cloud-background.png';
import { weatherImages } from 'helpers/images';
const [shower] = weatherImages;

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
      <aside className="container default">
        <div className="app-default">
          <header className="header">
            <nav className="nav">
              <div className="search-button">
                <button className="lg-cl" onClick={fetchingData}>
                  Search for places
                </button>
              </div>
              <div className="coordinate-icon">
                <i class="material-icons-round lg-cl">my_location</i>
              </div>
            </nav>
          </header>
          <main className="main">
            <section className="weather-today">
              <div>
                <img src={shower} alt="weather icon" />
              </div>
              <div>
                <h1>
                  15<span>℃</span>
                </h1>
                <h2>Shower</h2>
              </div>
              <div>
                <div>
                  <span>Today</span>
                  {` . `}
                  <span>Fri, 5 Jun</span>
                </div>
                <div>
                  <i class="material-icons-round">location_on</i>
                  <span>Jakarta</span>
                </div>
              </div>
            </section>
          </main>
        </div>
        <img className="img-bg" src={cloudBackground} alt="cloud background" />
      </aside>
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
