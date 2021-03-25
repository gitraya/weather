import { useState, useEffect } from 'react';
import 'styles/Aside.css';
import cloudBackground from 'images/Cloud-background.png';
import { getWeatherImage } from 'helpers/images';
import SearchModal from 'components/SearchModal';

const Aside = ({ data, location, cors, searchHandle, temp }) => {
  // react state for weather data and search modal
  const [modalOpen, setModalOpen] = useState(false);
  const [weatherImage, setWeatherImage] = useState(null);
  const [dates, setDates] = useState('');

  // handle modal button
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  // react side effect to change dates and image value
  useEffect(() => {
    if (data) {
      setWeatherImage(getWeatherImage(data.weather_state_abbr));
      setDates({
        date: new Date(data.applicable_date).getDate().toString(),
        day: new Intl.DateTimeFormat('en-US', { weekday: 'long' })
          .format(new Date(data.applicable_date))
          .slice(0, 3),
        month: new Intl.DateTimeFormat('en-US', { month: 'long' })
          .format(new Date(data.applicable_date))
          .slice(0, 3),
      });
    }
  }, [data]);

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
              <img src={weatherImage} alt="weather icon" />
            </div>
            <div className="text-weather">
              <h1>
                {temp.isFahrenheit
                  ? parseInt(temp.convertTemp(data.the_temp))
                  : parseInt(data.the_temp)}
                <span>{temp.isFahrenheit ? '℉' : '℃'}</span>
              </h1>
              <h2>{data.weather_state_name}</h2>
            </div>
            <div className="text-date">
              <div className="date">
                <span>Today</span>
                {`  .  `}
                <span>
                  {dates.day}, {dates.date} {dates.month}
                </span>
              </div>
              <div className="location">
                <i class="material-icons-round">location_on</i>
                <span>{location}</span>
              </div>
            </div>
          </section>
        </main>
      </div>
      <img className="img-bg" src={cloudBackground} alt="cloud background" />
      <SearchModal
        modal={{ handleModal, modalOpen }}
        cors={cors}
        searchHandle={searchHandle}
      />
    </aside>
  );
};

export default Aside;
