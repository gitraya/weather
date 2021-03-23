import Footer from 'components/Footer';

function App() {
  return (
    <div className="App">
      <div className="container main">
        <header className="header">
          <nav className="nav">
            <div className="search-button">
              <button>Search for places</button>
            </div>
            <i className="coordinate-icon"></i>
          </nav>
        </header>
        <main className="main">
          <section className="weather-today">
            <div></div>
          </section>
        </main>
        <img src="" alt="" />
      </div>
      <div className="container second">
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
