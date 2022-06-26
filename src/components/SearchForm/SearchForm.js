import React, { useState } from 'react';
import {CurrentCardsContext}  from '../../contexts/CurrentCardsContext';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';

function SearchForm() {

  // Подписываемся на контекст CurrentCardsContext
  const cardsData = React.useContext(CurrentCardsContext);

  // Стейт, в котором содержится значение инпута
  const [query, setQuery] = useState(null);
  // Стейт, в котором содержатся отфильтрованные карточки
  const [cardsFiltredQuery, setCardsFiltredQuery] = useState([]);

  // Обработчик изменения инпута обновляет стейт
  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  }

  const handleSearchQuery = (evn) => {
    evn.preventDefault();
    localStorage.setItem('query', query);
    const cardsFiltredQueryLocal = cardsData.filter(card => card.nameRU.includes(query)).splice(0,12);
    setCardsFiltredQuery(cardsFiltredQueryLocal);
  };


  return (
    <main className="searchForm">
      <form className="searchForm__nav">
        <button type="button" className="searchForm__button-search searchForm__icon-search" ></button>
        <input required id="name" name="name" type="text" placeholder="Фильм" className="searchForm__input-text"
          onChange={handleChangeQuery}/>
        <button type="button" className="searchForm__button-submit"  onClick={handleSearchQuery}></button>
      </form>
      <FilterCheckbox/>
      { (cardsFiltredQuery.length === 0) &&
        <p className="searchForm__message-nothing">Ничего не найдено</p>
      }
      { (query !== '' && cardsFiltredQuery.length !== 0) &&
        <MoviesCardList cardButtonClassName={'moviesCard__heart-button'} cards={cardsFiltredQuery}></MoviesCardList>
      }
      {(query !== '' && cardsFiltredQuery.length !== 0) &&
        <ButtonMore/>
      }
    </main>
  );
}

export default SearchForm;
