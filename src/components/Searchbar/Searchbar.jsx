import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";

/**
 * - search input
 * - takes setSearchQuery as prop
 */

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
				className={styles["search-bar"]}
			/>
		</div>
	);
};

SearchBar.propTypes = {
	setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
