import Footer from 'components/Footer';

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
      <div className="container default">
        <header className="header">
          <nav className="nav">
            <div className="search-button">
              <button onClick={fetchingData}>Search for places</button>
            </div>
            <div className="coordinate-icon">
              <i class="material-icons-round">my_location</i>
            </div>
          </nav>
        </header>
        <main className="main">
          <section className="weather-today">
            <div></div>
          </section>
        </main>
        <img
          src={process.env.PUBLIC_URL + '/images/Cloud-background.png'}
          alt="cloud background"
        />
      </div>
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
