import React from 'react'; 
import MoviesCard from '../MoviesCard/MoviesCard';
import {CurrentCardsContext}  from '../../contexts/CurrentCardsContext';

function MoviesCardList(props) {

  // Подписываемся на контекст CurrentCardsContext
  const cardsData = React.useContext(CurrentCardsContext);


  function CardList(props) {
    const cards = props.cards.splice(0,12);
    const listCards = cards.map((card) =>
      <MoviesCard card={card}  cardButtonClassName={props.cardButtonClassName}/>
    );
    return (
      <div className="moviesCardList">
        {listCards}
      </div>
    );  
  }


  return (
    <section className="moviesList">
      <CardList cards={cardsData}  cardButtonClassName={props.cardButtonClassName}/> 
    </section>

  );
}

export default MoviesCardList;