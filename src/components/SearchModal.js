import { useState } from 'react';
import 'styles/SearchModal.css';

const SearchModal = ({ modal, cors }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchLocation = async (e) => {
    e.preventDefault();
    await fetch(
      `${cors}https://www.metaweather.com/api/location/search/?query=${searchValue.toLowerCase()}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResult(data);
      })
      .catch((err) => console.log(err));

    if (searchResult.length === 0)
      return setSearchResult([{ message: 'Location cannot be found.' }]);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      return setSearchResult([]);
    }
  };

  const handleCloseModal = () => {
    modal.handleModal();
    setSearchValue('');
    setSearchResult([]);
    return;
  };

  const handleSearchedLocation = (e) => {
    console.log(e.target.querySelector('span').innerText);
  };

  const renderResultButton = searchResult.map((result, i) => {
    return searchResult.length > 0 && !result.message ? (
      <button
        key={result.woeid}
        type="submit"
        onClick={handleSearchedLocation}
        className="result-button"
      >
        <span>{result.title}</span>
        <i className="material-icons-round">navigate_next</i>
      </button>
    ) : (
      <div key={i} className="result-not-found">
        <span>{result.message}</span>
      </div>
    );
  });

  return (
    <div
      className="modal-search"
      style={modal.modalOpen ? { display: 'flex' } : { display: 'none' }}
    >
      <div className="clear">
        <i onClick={handleCloseModal} className="material-icons-round">
          clear
        </i>
      </div>
      <form className="form-search" onSubmit={handleSearchLocation}>
        <div className="input-control">
          <i className="material-icons-round">search</i>
          <input
            type="text"
            name="location"
            id="location"
            value={searchValue}
            placeholder="search location"
            onChange={handleInputChange}
          />
        </div>
        <input className="search-submit" type="submit" value="Search" />
      </form>
      <div className="result-search">{renderResultButton}</div>
    </div>
  );
};

export default SearchModal;
