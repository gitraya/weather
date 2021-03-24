import 'styles/CardsHighlights.css';

const CardsHighlights = () => {
  return (
    <div className="cards-highlights">
      <h2>Today’s Hightlights</h2>
      <div className="grid-highlights">
        <div className="card-highlight">
          <h3 className="highlight-title">Wind status</h3>
          <span className="highlight-text more">
            7<span>mph</span>
          </span>
          <div className="indicator-navigation">
            <div className="wind-icon">
              <i class="material-icons-round">navigation</i>
            </div>
            <span>WSW</span>
          </div>
        </div>
        <div className="card-highlight">
          <h3 className="highlight-title">Humidity</h3>
          <span className="highlight-text more">
            84<span>%</span>
          </span>
          <div className="indicator-humidity">
            <div className="percentage-text">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <div className="humidity-percentage">
              <div className="percent-range"></div>
            </div>
            <span className="percent-text">%</span>
          </div>
        </div>
        <div className="card-highlight">
          <h3 className="highlight-title">Visibility</h3>
          <span className="highlight-text">
            6,4 <span>miles</span>
          </span>
        </div>
        <div className="card-highlight">
          <h3 className="highlight-title">Air Pressure</h3>
          <span className="highlight-text">
            998 <span>mb</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardsHighlights;
