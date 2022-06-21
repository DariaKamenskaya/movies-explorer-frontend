
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {

  return (
    <section className="moviesList">
      <div className="moviesCardList">
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
      </div>
      <button className="moviesCardList__button-more" type="button" >{"Еще"}</button>
    </section>

  );
}

export default MoviesCardList;