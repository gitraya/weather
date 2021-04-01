import { useEffect, useState } from 'react';
import 'components/Main/CardWeather/CardWeather.css';
import { getWeatherImage } from 'helpers/images';

const CardWeather = ({ data, index, temp }) => {
  const [dates, setDates] = useState('');

  // react side effect to change dates value
  useEffect(() => {
    if (data) {
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
    <div className="card-weather">
      <h2 className="date">
        {index === 0
          ? 'Tommorow'
          : `${dates.day}, ${dates.date} ${dates.month}`}
      </h2>
      <img
        className="weather-image"
        src={getWeatherImage(data.weather_state_abbr)}
        alt="weather icon"
      />
      <div className="degree">
        <span>
          {temp.isFahrenheit
            ? `${parseInt(temp.convertTemp(data.max_temp))}℉`
            : `${parseInt(data.max_temp)}°C`}
        </span>
        <span>
          {temp.isFahrenheit
            ? `${parseInt(temp.convertTemp(data.min_temp))}℉`
            : `${parseInt(data.min_temp)}°C`}
        </span>
      </div>
    </div>
  );
};

export default CardWeather;
