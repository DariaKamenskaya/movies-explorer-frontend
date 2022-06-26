import React from 'react'; 
import MoviesCard from '../MoviesCard/MoviesCard';
import {CurrentCardsContext}  from '../../contexts/CurrentCardsContext';

function MoviesCardList(props) {



  function CardList(props) {
    const cards = props.cards;
      const listCards = cards.map((card) =>
        <MoviesCard card={card} key={card.id} cardButtonClassName={props.cardButtonClassName}/>
      );
    return (
      <div className="moviesCardList">
        {listCards}
      </div>
    );  
  }


  return (
    <section className="moviesList">
      <CardList cards={props.cards}  cardButtonClassName={props.cardButtonClassName}/> 
    </section>

  );
}

export default MoviesCardList;