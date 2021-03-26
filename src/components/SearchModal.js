import { useState } from 'react';
import { useLoading, ThreeDots } from '@agney/react-loading';
import 'styles/SearchModal.css';

const SearchModal = ({ modal, cors, searchHandle }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });

  // handle the location search of the user
  const handleSearchLocation = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(
      `${cors}https://www.metaweather.com/api/location/search/?query=${searchValue.toLowerCase()}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length < 1) {
          return setSearchResult([{ message: 'Location cannot be found.' }]);
        } else {
          return setSearchResult(data);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  // handle input value changes
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      return setSearchResult([]);
    }
  };

  // handle button close search modal
  const handleCloseModal = () => {
    modal.handleModal();
    setSearchValue('');
    setSearchResult([]);
    return;
  };

  // handle user search results
  const handleSearchedLocation = (result) => {
    handleCloseModal();
    searchHandle(result.woeid);
  };

  // render button element
  const renderResultButton = () => {
    // if still loading, show animation
    if (isLoading) {
      return (
        <div className="loading" {...containerProps}>
          {indicatorEl}
        </div>
      );
    }
    return searchResult.map((result, i) => {
      return searchResult.length > 0 && !result.message ? (
        <button
          key={result.woeid}
          type="submit"
          onClick={() => {
            handleSearchedLocation(result);
          }}
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
  };

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
      <div className="result-search">{renderResultButton()}</div>
    </div>
  );
};

export default SearchModal;
