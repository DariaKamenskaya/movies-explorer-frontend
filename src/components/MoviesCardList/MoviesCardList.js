//import React from 'react'; 
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

 // const movieCount = props.movieCount;
  const cards = props.cards;
  console.log('CardList', cards)
    const listCards = cards.map((card) =>
      <MoviesCard card={card} key={card.id} cardButtonClassName={props.cardButtonClassName}/>
    );
  return (
    <div className="moviesCardList">
      {listCards}
    </div>
  );  
}



export default MoviesCardList;