
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  return (
    <section className="moviesList">
      <div className="moviesCardList">
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
        <MoviesCard cardButtonClassName={props.cardButtonClassName}/>
      </div>
    </section>

  );
}

export default MoviesCardList;