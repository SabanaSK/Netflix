import { useState } from "react";
/* import movie from "../../movies.json"; */
/* Import Filter */
/* import MovieList  */

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
 /*  const [filteredData, setFilteredData] = useState(movie); */

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

   /* Using filter */
  };

  return (
    <div>
      <input 
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}  
      />
    {/*  Movie list component  />  */}
    </div>
  );
};

export default SearchBar;
