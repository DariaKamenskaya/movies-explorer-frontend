import React, { useEffect, useState } from 'react';
import {CurrentCardsContext}  from '../../contexts/CurrentCardsContext';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader'

function SearchForm(props) {

  // Подписываемся на контекст CurrentCardsContext
  const cardsData = React.useContext(CurrentCardsContext);

  // Стейт, в котором содержится значение инпута
  const [query, setQuery] = useState("");
  // Стейт, в котором содержатся отфильтрованные карточки
  const [cardsFiltredQuery, setCardsFiltredQuery] = useState([]);
  // Стейт, в котором содержатся отфильтрованные карточки для вывода на экран
  //const [cardsFiltredQueryRender, setCardsFiltredQueryRender] = useState([]);
  // Стейт, в котором содержится значение генерируемых карточек
  const [movieCount, setMovieCount] = useState(8);
  // Стейт, в котром содержится флаг прелоадера
  const [isPreloader, setIsPreloader] = useState(false);
  // Стейт, в котром содержится сообщение об ошибке
  const [errorText, setErrorText] = useState("");
  // Извлечение из локального хранилища ранее введенного запроса
  const sessionStorageQuery = localStorage.getItem("sessionStorageQuery");

  useEffect(() => {
    handleChangeWidth();
  }, [props.windowSize])



  const handleChangeWidth = () => {
    setMovieCount(props.movieCount);
    console.log('handleChangeWidth',  movieCount, sessionStorageQuery, window.innerWidth);
    if (sessionStorageQuery !== null  && sessionStorageQuery !== "") {
      setQuery(sessionStorageQuery);
      const cardsFiltredQueryLocal = JSON.parse(localStorage.getItem("query_movie"));
      setCardsFiltredQuery(cardsFiltredQueryLocal.splice(0,movieCount));
      console.log('handleChangeWidth1',cardsFiltredQueryLocal);
    }
  }

  const handleRander = (e) => {
    e.preventDefault();
    const movieCountMore = (props.windowSize > 768 ? movieCount+3 :  movieCount+2);
    const cardsFiltredQueryLocal = JSON.parse(localStorage.getItem('query_movie'));
    setCardsFiltredQuery(cardsFiltredQueryLocal.splice(0, movieCountMore));
    setMovieCount(movieCountMore);
    console.log('bbb', props.windowSize, movieCount,  movieCountMore, cardsFiltredQueryLocal.splice(0,movieCount));
  }


  // Обработчик изменения инпута обновляет стейт
  const handleChangeQuery = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }

  
  // Обработчик поиска
  const handleSearchQuery = (evn) => {
    evn.preventDefault();
    localStorage.setItem('sessionStorageQuery', query);
    if (query === "") setErrorText('Нужно ввести ключевое слово'); 
    setIsPreloader(true);
    const cardsFiltred = cardsData.filter(card => card.nameRU.includes(query));
    localStorage.setItem('query_movie', JSON.stringify(cardsFiltred));
    setIsPreloader(false);
    setCardsFiltredQuery(cardsFiltred.splice(0,movieCount));
    //const cardsFiltredQueryLocal = cardsFiltred.splice(0,movieCount);
    //setCardsFiltredQueryRender(cardsFiltredQueryLocal);
    console.log('handleSearchQuery', props.windowSize, movieCount, cardsFiltred);
  };


  return (
    <main className="searchForm">
      <form className="searchForm__nav">
        <button type="button" className="searchForm__button-search searchForm__icon-search" ></button>
        <input required minLength="1" maxLength="30" id="name" name="name" type="text" placeholder="Фильм" className="searchForm__input-text"
          onChange={handleChangeQuery} value={query}/>
        <button type="button" className="searchForm__button-submit"  onClick={handleSearchQuery}></button>
      </form>
      <span id="search-input-error" className="searchForm__input-error">{errorText}</span>
      <FilterCheckbox/>
      { (cardsFiltredQuery.length === 0 || query === "") &&
        <p className="searchForm__message-nothing">Ничего не найдено</p>
      }
      { (isPreloader) &&
          <Preloader />
      }
      { ((query !== "" || sessionStorageQuery !== "") && cardsFiltredQuery.length !== 0) &&
        <section className="moviesList">
          <MoviesCardList cardButtonClassName={'moviesCard__heart-button'} cards={cardsFiltredQuery}></MoviesCardList>
        </section>
      }
      {((query !== "" || sessionStorageQuery !== "") && cardsFiltredQuery.length === movieCount && cardsFiltredQuery.length > 3) &&
        <ButtonMore onClick={handleRander}/>
      }
    </main>
  );
}

export default SearchForm;
