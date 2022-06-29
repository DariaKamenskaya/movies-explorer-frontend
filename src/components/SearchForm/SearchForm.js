import React, { useEffect, useState } from 'react';
import {CurrentCardsContext}  from '../../contexts/CurrentCardsContext';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader'
import { apiMain } from '../../utils/MainApi';

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
  // Стейт, в котором содержится флаг прелоадера
  const [isPreloader, setIsPreloader] = useState(false);
  // Стейт, в котором содержится сообщение об ошибке
  const [errorText, setErrorText] = useState("");
  // Стейт, в котором содержится флаг переключателя короткометражек
  const getStoredStateCheckBox = () => {
    // Извлечение из локального хранилища ранее введенного состояния для кнопки переключатель короткометражек
    const sessionIsCheckBox = localStorage.getItem("isCheckBox");
    const initialIsCheckBox = (sessionIsCheckBox !== null) ? JSON.parse(localStorage.getItem("isCheckBox")) : false;
    return initialIsCheckBox;
  };
  const [isCheckBox, setIsCheckBox] = useState(getStoredStateCheckBox);
  // Извлечение из локального хранилища ранее введенного запроса
  const sessionStorageQuery = localStorage.getItem("sessionStorageQuery");
    // Стейт, в котором содержится класс кнопки лайка карточки
    const [cardButtonLikeClassName, setCardButtonLikeClassName] = useState("");

  

  // Создаём переменную, которую после зададим в `className` для кнопки переключатель короткометражек
  const checkBoxButtonClassName = (
    `${isCheckBox ?  'filterCheckbox__tumbler-active' :  'filterCheckbox__tumbler-disactive'}`
  );



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
    //if (sessionIsCheckBox !== null) setIsCheckBox(JSON.parse(localStorage.getItem("isCheckBox")));
    console.log('isCheckBox', isCheckBox);
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
    if (query === "") {
      setErrorText('Нужно ввести ключевое слово'); 
    } else {
      setIsPreloader(true);
      const cardsFiltred = cardsData.filter(card => card.nameRU.includes(query));
      if (isCheckBox) {
        handleSearchCheckBox(cardsFiltred);
      } else {
        localStorage.setItem('query_movie', JSON.stringify(cardsFiltred));
        setCardsFiltredQuery(cardsFiltred.splice(0,movieCount));
      }
      setIsPreloader(false);
      //const cardsFiltredQueryLocal = cardsFiltred.splice(0,movieCount);
      //setCardsFiltredQueryRender(cardsFiltredQueryLocal);
      console.log('handleSearchQuery', props.windowSize, movieCount, cardsFiltred);
    };
  };

  // Обработчик переключателя короткометражек
  const handleCheckBoxButton = (e) => {
    e.preventDefault();
    setIsCheckBox(isCheckBox =>!isCheckBox);
    localStorage.setItem('isCheckBox', JSON.stringify(!isCheckBox));
    if (!isCheckBox) {
      (cardsFiltredQuery.length !== 0)  ?  handleSearchCheckBox(JSON.parse(localStorage.getItem("query_movie"))) :  handleSearchCheckBox(cardsData);
    }  else {
      const cardsFiltred = cardsData.filter(card => card.nameRU.includes(query));
      localStorage.setItem('query_movie', JSON.stringify(cardsFiltred));
      setCardsFiltredQuery(cardsFiltred.splice(0,movieCount));
    }
  }


  // Обработчик переключателя короткометражек
  const handleSearchCheckBox = (cards) => {
    const cardsFiltred = cards.filter(card => card.duration < 40);
    localStorage.setItem('query_movie', JSON.stringify(cardsFiltred));
    setCardsFiltredQuery(cardsFiltred.splice(0,movieCount));
  }


  // Обработчик постановки/снятия лайков
  function handleCardLike(card, currentUser, setCurrentCards) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id); // i._id
    // Отправляем запрос в API 
    if (isLiked) {
      //если лайкнули карточку, то добавляем ее в список сохраненных фильмов через apiMain
      apiMain.postCard(card)
      .then((newCard) => {
        setCurrentCards((cardsData) => cardsData.map((c) => c._id === card._id ? newCard.data : c));
        // делаем класс кнопки активным
        setCardButtonLikeClassName('moviesCard__heart-button-active');
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    } else {
      //если дизлайк карточки, то удаляем ее из списка сохраненных фильмов через apiMain
      apiMain.deleteCard(card._id)
      .then((newCard) => {
        setCurrentCards((cardsData) => cardsData.map((c) => c._id === card._id ? newCard.data : c));
        // делаем класс кнопки неактивным
        setCardButtonLikeClassName('moviesCard__heart-button-disactive');
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    }

    
  }


  return (
    <main className="searchForm">
      <form className="searchForm__nav">
        <button type="button" className="searchForm__button-search searchForm__icon-search" ></button>
        <input required minLength="1" maxLength="30" id="name" name="name" type="text" placeholder="Фильм" className="searchForm__input-text"
          onChange={handleChangeQuery} value={query}/>
        <button type="button" className="searchForm__button-submit"  onClick={handleSearchQuery}></button>
      </form>
      <span id="search-input-error" className="searchForm__input-error">{errorText}</span>
      <FilterCheckbox classTumbler={checkBoxButtonClassName} onClick={handleCheckBoxButton}/>
      { (cardsFiltredQuery.length === 0 || query === "") &&
        <p className="searchForm__message-nothing">Ничего не найдено</p>
      }
      { (isPreloader) &&
          <Preloader />
      }
      { ((query !== "" || sessionStorageQuery !== "") && cardsFiltredQuery.length !== 0) &&
        <section className="moviesList">
          <MoviesCardList cardButtonClassName={'moviesCard__heart-button'} cards={cardsFiltredQuery} onClick={handleCardLike}></MoviesCardList>
        </section>
      }
      {((query !== "" || sessionStorageQuery !== "") && cardsFiltredQuery.length === movieCount && cardsFiltredQuery.length > 3) &&
        <ButtonMore onClick={handleRander}/>
      }
    </main>
  );
}

export default SearchForm;
