import moviePoster from '../../images/moviePoster.svg'; 

function MoviesCard(props) {


  return(
    <article className="moviesCard">
      <img src={moviePoster} alt={'Постер'} className="moviesCard__image"  />
      <div className="moviesCard__title-block">
        <div className="moviesCard__likes">
          <p className="moviesCard__title">{"33 слова о дизайне"}</p>
          <button className={props.cardButtonClassName} type="button" ></button>
        </div>
        <p className="moviesCard__subtitle">{"1ч42м"}</p>
      </div>
    </article>
  );
}

export default MoviesCard; 