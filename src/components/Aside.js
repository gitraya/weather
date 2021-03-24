import { useState, useEffect } from 'react';
import 'styles/Aside.css';
import cloudBackground from 'images/Cloud-background.png';
import { getWeatherImage } from 'helpers/images';

const Aside = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [weatherImage, setWeatherImage] = useState(null);
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (data) setWeatherImage(data.weather_state_abbr);
  }, []);

  return (
    <aside className="container default">
      <div className="app-default">
        <header className="header">
          <nav className="nav">
            <div className="search-button">
              <button type="button" onClick={handleModal}>
                Search for places
              </button>
            </div>
            <button className="coordinate-icon">
              <i class="material-icons-round">my_location</i>
            </button>
          </nav>
        </header>
        <main className="main">
          <section className="weather-today">
            <div className="image-weather">
              <img src={getWeatherImage(weatherImage)} alt="weather icon" />
            </div>
            <div className="text-weather">
              <h1>
                15<span>℃</span>
              </h1>
              <h2>Shower</h2>
            </div>
            <div className="text-date">
              <div className="date">
                <span>Today</span>
                {`  .  `}
                <span>Fri, 5 Jun</span>
              </div>
              <div className="location">
                <i class="material-icons-round">location_on</i>
                <span>Jakarta</span>
              </div>
            </div>
          </section>
        </main>
      </div>
      <img className="img-bg" src={cloudBackground} alt="cloud background" />
      <div
        className="modal-search"
        style={modalOpen ? { display: 'flex' } : { display: 'none' }}
      >
        <div className="clear">
          <i onClick={handleModal} className="material-icons-round">
            clear
          </i>
        </div>
        <form className="form-search">
          <div className="input-control">
            <i className="material-icons-round">search</i>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="search location"
            />
          </div>
          <input className="search-submit" type="submit" value="Search" />
        </form>
        <div className="result-search">
          <button className="result-button">
            <span>London</span>
            <i className="material-icons-round">navigate_next</i>
          </button>
          <button className="result-button">
            <span>Jakarta</span>
            <i className="material-icons-round">navigate_next</i>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
