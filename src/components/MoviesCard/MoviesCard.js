import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {

  // Стейт, в котором содержится состояние лайка карточки (если пользолватель лайкнул карточку, значит сохранил ее в своих карточках)
  const [isSaved, setIsSaved] = useState(false);

  const location = useLocation();

  function handleLikeClick()  {
    setIsSaved(!isSaved);
    props.onClickLike(props.card, isSaved);
  }

  function getTimetoMinute(time) {
    let hours = Math.trunc(time/60);
    let minutes = time%60
    return hours + 'ч ' + minutes + 'с' 
  };

  return(
    <article className="moviesCard">
      {(location.pathname === '/movies') &&
        <a rel="noopener noreferrer"
          target="_blank"
          href={props.card.trailerLink}
          className="moviesCard__link">
          <img src={`https://api.nomoreparties.co${props.card.image.url}`}
               alt={'Постер'}
               className="moviesCard__image"  />
       </a> 
      }
      {(location.pathname === '/saved-movies') &&
        <a rel="noopener noreferrer"
           target="_blank"
           href={props.card.trailerLink}
           className="moviesCard__link">
          <img src={props.card.image}
               alt={'Постер'}
               className="moviesCard__image"  />
        </a>
      }
      <div className="moviesCard__title-block">
        <div className="moviesCard__likes">
          <p className="moviesCard__title">{props.card.nameRU}</p>
          { (location.pathname === '/movies') &&
            <button className={ props.isSaved ?  'moviesCard__heart-button-active' :  'moviesCard__heart-button-disactive'}
                    type="button"
                    onClick={handleLikeClick}>
            </button>
          }
          { (location.pathname === '/saved-movies') &&
            <button className={ `${props.isSaved ?  'moviesCard__close-button' :  ''}`}
                    type="button"
                    onClick={handleLikeClick}>
            </button>
          }
        </div>
        <p className="moviesCard__subtitle">{getTimetoMinute(props.card.duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard; 