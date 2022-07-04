//import React from 'react'; 
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  const location = useLocation();

 // const movieCount = props.movieCount;
  const cards = props.cards;
  const isLikedCard = props.isLikedCard;
    const listCards = cards.map((card) =>
      <MoviesCard card={card}
                  key={(location.pathname === '/movies') ? card.id : card.movieId}
                  isSaved={(location.pathname === '/movies') ? isLikedCard[card.id] : true}
                  onClickLike={props.onClickLike} />
    );
  return (
    <div className="moviesCardList">
      {listCards}
    </div>
  );  
}



export default MoviesCardList;