import 'styles/Main.css';
import Footer from 'components/Footer';
import CardWeather from 'components/CardWeather';
import CardsHighlights from 'components/CardsHighlights';

const Main = () => {
  const arr = [1, 2, 3, 4, 5];
  const cardsWeather = arr.map((card) => {
    return <CardWeather key={card} />;
  });
  return (
    <div className="container main">
      <header className="header">
        <nav className="nav main">
          <button className="button-temp">℃</button>
          <button className="button-temp">℉</button>
        </nav>
      </header>
      <main className="main">
        <div className="cards-weekly">{cardsWeather}</div>
        <CardsHighlights />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
