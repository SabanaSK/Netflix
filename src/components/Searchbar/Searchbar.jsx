import PropTypes from 'prop-types';

const SearchBar = ({ setSearchQuery }) => {
  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  return (
    <div>
      <input 
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
