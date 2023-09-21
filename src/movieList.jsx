import moviesData from '../movies.json';

const GetMovieThumbnails = () => {
 
   return (
    <div>
      {moviesData.map((movie, index) => (
        <div key={index}>
          <img src={movie.thumbnail} alt={movie.title} />
          <p>Year: {movie.year}</p>
          <p>Rating: {movie.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default GetMovieThumbnails;
