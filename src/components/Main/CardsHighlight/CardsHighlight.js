import 'components/Main/CardsHighlight/CardsHighlight.css';

const CardsHighlight = ({ data }) => {
  return (
    <div className="cards-highlights">
      <h2>Today’s Hightlights</h2>
      <div className="grid-highlights">
        <div className="card-highlight">
          <h3 className="highlight-title">Wind status</h3>
          <span className="highlight-text more">
            {parseInt(data.wind_speed)}
            <span>mph</span>
          </span>
          <div className="indicator-navigation">
            <div className="wind-icon">
              <i
                class="material-icons-round"
                style={{
                  transform: `rotate(${parseInt(data.wind_direction)}deg)`,
                }}
              >
                navigation
              </i>
            </div>
            <span>{data.wind_direction_compass}</span>
          </div>
        </div>
        <div className="card-highlight">
          <h3 className="highlight-title">Humidity</h3>
          <span className="highlight-text more">
            {data.humidity}
            <span>%</span>
          </span>
          <div className="indicator-humidity">
            <div className="percentage-text">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <div className="humidity-percentage">
              <div
                className="percent-range"
                style={{ width: `${data.humidity}%` }}
              ></div>
            </div>
            <span className="percent-text">%</span>
          </div>
        </div>
        <div className="card-highlight">
          <h3 className="highlight-title">Visibility</h3>
          <span className="highlight-text">
            {data.visibility.toFixed(1).split('.').join(',')} <span>miles</span>
          </span>
        </div>
        <div className="card-highlight">
          <h3 className="highlight-title">Air Pressure</h3>
          <span className="highlight-text">
            {parseInt(data.air_pressure)} <span>mb</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardsHighlight;
