import React, { useState } from 'react';
import {CurrentCardsContext}  from '../../contexts/CurrentCardsContext';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';

function SearchForm() {

  // Подписываемся на контекст CurrentCardsContext
  const cardsData = React.useContext(CurrentCardsContext);

  // Стейт, в котором содержится значение инпута
  const [query, setQuery] = useState('');

  // Обработчик изменения инпута обновляет стейт
  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  }

  const handleSearchQuery = (evn) => {
    evn.preventDefault();
    localStorage.setItem('query', query);
  };

  const cardsFiltredQuery = cardsData.filter(card => card.nameRU.includes(query)).splice(0,12);

  return (
    <main className="searchForm">
      <form className="searchForm__nav">
        <button type="button" className="searchForm__button-search searchForm__icon-search" ></button>
        <input required id="name" name="name" type="text" placeholder="Фильм" className="searchForm__input-text"
          onChange={handleChangeQuery}/>
        <button type="button" className="searchForm__button-submit"  onClick={handleSearchQuery}></button>
      </form>
      <FilterCheckbox/>
      { (query !== '') &&
        <MoviesCardList cardButtonClassName={'moviesCard__heart-button'} cards={cardsFiltredQuery}></MoviesCardList>
      }
      { (query === '') &&
        <p className="searchForm__message-nothing">Ничего не найдено</p>
      }
      <ButtonMore/>
    </main>
  );
}

export default SearchForm;
