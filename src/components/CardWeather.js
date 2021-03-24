import 'styles/CardWeather.css';
import { weatherImages } from 'helpers/images';

const CardWeather = () => {
  return (
    <div className="card-weather">
      <h2 className="date">Tomorrow</h2>
      <img
        className="weather-image"
        src={weatherImages[4]}
        alt="weather icon"
      />
      <div className="degree">
        <span>16°C</span>
        <span>11°C</span>
      </div>
    </div>
  );
};

export default CardWeather;
