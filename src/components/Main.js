import { useEffect, useState } from 'react';
import 'styles/Main.css';
import Footer from 'components/Footer';
import CardWeather from 'components/CardWeather';
import CardsHighlights from 'components/CardsHighlights';

const Main = ({ data, todaysData, temp }) => {
  // react state for the next 5 days of weather
  const [nextWeather, setNextWeather] = useState([]);
  const [tempStyle, setTempStyle] = useState({
    fahren: false,
    celci: true,
  });

  // mapping weather data into card components
  const cardsWeather = nextWeather.map((day, i) => {
    return <CardWeather key={day.id} data={day} index={i} temp={temp} />;
  });

  // handle temperature changes
  const handleChangeTemp = (e) => {
    if (e.target.id === 'fahrenheit' && !temp.isFahrenheit) {
      setTempStyle({ fahren: !tempStyle.fahren, celci: !tempStyle.celci });
      return temp.changeTemp();
    } else if (e.target.id === 'celcius' && temp.isFahrenheit) {
      setTempStyle({ fahren: !tempStyle.fahren, celci: !tempStyle.celci });
      return temp.changeTemp();
    }
  };

  useEffect(() => {
    if (data) {
      setNextWeather(data.slice(1));
      console.log(data);
    }
  }, [data, setNextWeather]);

  return (
    <div className="container main">
      <header className="header">
        <nav className="nav main">
          <button
            type="submit"
            onClick={(e) => handleChangeTemp(e)}
            id="celcius"
            className="button-temp"
            style={
              tempStyle.celci
                ? { color: '#110E3C', background: '#E7E7EB' }
                : { color: '#E7E7EB', background: '#585676' }
            }
          >
            ℃
          </button>
          <button
            type="submit"
            onClick={(e) => handleChangeTemp(e)}
            id="fahrenheit"
            className="button-temp"
            style={
              tempStyle.fahren
                ? { color: '#110E3C', background: '#E7E7EB' }
                : { color: '#E7E7EB', background: '#585676' }
            }
          >
            ℉
          </button>
        </nav>
      </header>
      <main className="main">
        <div className="cards-weekly">{cardsWeather}</div>
        <CardsHighlights data={todaysData} />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
