

function MoviesCard(props) {


  return(
    <article className="moviesCard">
      <img src={`https://api.nomoreparties.co${props.card.image.url}`} alt={'Постер'} className="moviesCard__image"  />
      <div className="moviesCard__title-block">
        <div className="moviesCard__likes">
          <p className="moviesCard__title">{props.card.nameRU}</p>
          <button className={props.cardButtonClassName} type="button" ></button>
        </div>
        <p className="moviesCard__subtitle">{props.card.duration}</p>
      </div>
    </article>
  );
}

export default MoviesCard; 