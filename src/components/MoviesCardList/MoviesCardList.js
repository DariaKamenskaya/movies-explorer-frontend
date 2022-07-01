//import React from 'react'; 
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

/*   function handleClick()  {
    props.onClick(props.card);
    console.log(props.card);
  } */

 // const movieCount = props.movieCount;
  const cards = props.cards;
  const isLikedCard = props.isLikedCard;

    const listCards = cards.map((card) =>
      <MoviesCard card={card} key={card.id} isSaved={isLikedCard[card.id]} onClickLike={props.onClickLike} />
    );
  return (
    <div className="moviesCardList">
      {listCards}
    </div>
  );  
}



export default MoviesCardList;