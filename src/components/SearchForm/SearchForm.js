import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {CurrentCardsContext}  from '../../contexts/CurrentCardsContext';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader'
import { apiMain } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SearchForm(props) {

  // Подписываемся на контекст CurrentCardsContext
  const cardsData = React.useContext(CurrentCardsContext);
  // Подписываемся на контекст CurrentUserContext
  const userData = React.useContext(CurrentUserContext);

  // Стейт, в котором содержится значение инпута для '/movies'
  const [query, setQuery] = useState("");
  // Стейт, в котором содержится значение инпута для '/saved-movies'
  const [querySavedMovie, setQuerySavedMovie] = useState("");
  // Стейт, в котором содержатся отфильтрованные карточки
  const [cardsFiltredQuery, setCardsFiltredQuery] = useState([]);
  // Стейт, в котором содержатся отфильтрованные сохраненные карточки
  const [cardsSavedFiltredQuery, setCardsSavedFiltredQuery] = useState([]);
  // Стейт, в котором содержится значение генерируемых карточек
  const [movieCount, setMovieCount] = useState(8);
  // Стейт, в котором содержится флаг прелоадера
  const [isPreloader, setIsPreloader] = useState(false);
  // Стейт, в котором содержится сообщение об ошибке
  const [errorText, setErrorText] = useState("");
  // Стейт, в котором содержится флаг переключателя короткометражек
  const getStoredStateCheckBox = (cardsData) => {
    // Извлечение из локального хранилища ранее введенного состояния для кнопки переключатель короткометражек
    const sessionIsCheckBox = localStorage.getItem("isCheckBox");
    const initialIsCheckBox = (sessionIsCheckBox !== null) ? JSON.parse(localStorage.getItem("isCheckBox")) : false;
    return initialIsCheckBox;
  };
  const [isCheckBox, setIsCheckBox] = useState(getStoredStateCheckBox);
  // Стейт, в котором содержится флаг переключателя короткометражек для страницы сохраненные фильмы
  const getStoredStateSavedMovieCheckBox = () => {
    // Извлечение из локального хранилища ранее введенного состояния для кнопки переключатель короткометражек
    const sessionIsCheckBox = localStorage.getItem("isSavedMovieCheckBox");
    console.log('sessionIsCheckBox', sessionIsCheckBox);
    const initialIsCheckBox = (sessionIsCheckBox !== null) ? JSON.parse(localStorage.getItem("isSavedMovieCheckBox")) : false;
    return initialIsCheckBox;
  };
  const [isSavedMovieCheckBox, setIsCSavedMovieCheckBox] = useState(getStoredStateSavedMovieCheckBox);
  // Извлечение из локального хранилища ранее введенного запроса
  const sessionStorageQuery = localStorage.getItem("sessionStorageQuery");
  // Стейт, в котором содержится состояние лайка карточки
  const [isLikedCard, setIsLikedCard] = useState({});
  // Стейт, в котором содержатся сохраненные карточки
  const [savedCards, setSavedCards] = useState([]);
  // Стейт, в котором содержатся id сохраненной карточки
  const [idSavedCards, setIdSavedCards] = useState([]);

  const location = useLocation();

  // Создаём переменную, которую после зададим в `className` для кнопки переключатель короткометражек
  const checkBoxButtonClassName = (
    `${isCheckBox ?  'filterCheckbox__tumbler-active' :  'filterCheckbox__tumbler-disactive'}`
  );
  // Создаём переменную, которую после зададим в `className` для кнопки переключатель короткометражек для страницы сохраненные фильмв
  const checkBoxButtonClassNameSavedMovie = (
    `${isSavedMovieCheckBox ?  'filterCheckbox__tumbler-active' :  'filterCheckbox__tumbler-disactive'}`
  );

  //костыль для поиска карточек
  const [nothingSavedFilm, setNothingSavedFilm] = useState(false);



  useEffect(() => {
    handleChangeWidth();
  }, [props.windowSize, userData])




  const handleChangeWidth = () => {
    setMovieCount(props.movieCount);
    // получаем сохраненные карточки с нашего API
    if (userData.name !== undefined ) {
      apiMain.getInitialCards()
      .then((data) => {
        const savedMovie = data.filter((card) => card.owner === userData._id);
        const savedMovieId = savedMovie.map((card) => card.movieId);
        // добавляем карточку в список сохраненных фильмов пользователя
        setSavedCards(savedMovie);
        setCardsSavedFiltredQuery(savedMovie);
        // добавляем id карточки в список id сохраненных фильмов
        setIdSavedCards(savedMovieId);
        localStorage.setItem('saved_movie', JSON.stringify(savedMovie));
        const savedMovieLiked = {};
        savedMovieId.forEach((id) => {
          savedMovieLiked[String(id)] = true;
        })
        // присваиваем карточке id статус лайк
        setIsLikedCard(savedMovieLiked);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
      if (sessionStorageQuery !== null  && sessionStorageQuery !== "") {
        (location.pathname === '/movies') ? setQuery(sessionStorageQuery) : setQuerySavedMovie('');
        const cardsFiltredQueryLocal = JSON.parse(localStorage.getItem("query_movie"));
        setCardsFiltredQuery(cardsFiltredQueryLocal.splice(0,movieCount));
      }
    }
  }

  const handleRander = (e) => {
    e.preventDefault();
    const movieCountMore = (props.windowSize > 768 ? movieCount+3 :  movieCount+2);
    const cardsFiltredQueryLocal = JSON.parse(localStorage.getItem('query_movie'));
    setCardsFiltredQuery(cardsFiltredQueryLocal.splice(0, movieCountMore));
    setMovieCount(movieCountMore);
  }


  // Обработчик изменения инпута обновляет стейт
  const handleChangeQuery = (e) => {
    e.preventDefault();
    (location.pathname === '/movies') ? setQuery(e.target.value) : setQuerySavedMovie(e.target.value);
  }

  
  // Обработчик поиска
  const handleSearchQuery = (evn) => {
    setErrorText(''); 
    evn.preventDefault();
    if (location.pathname === '/movies')  localStorage.setItem('sessionStorageQuery', query);
    let querySearch = '';
    (location.pathname === '/movies') ? querySearch = query : querySearch = querySavedMovie;
    console.log('nothing search 0', cardsSavedFiltredQuery);
    let isCheckBoxLocal = false;
    (location.pathname === '/movies') ? isCheckBoxLocal = isCheckBox : isCheckBoxLocal = isSavedMovieCheckBox;
    if (querySearch === "") {
      setErrorText('Нужно ввести ключевое слово');
      //setCardsSavedFiltredQuery([...[]]);
      console.log('nothing search 2', cardsSavedFiltredQuery);
    } else {
      setIsPreloader(true);
      let cardForSearch = [];
      (location.pathname === '/movies') ? cardForSearch = cardsData : cardForSearch = savedCards;
      const cardsFiltred = cardForSearch.filter(card => card.nameRU.toLowerCase().includes(querySearch.toLowerCase()));
      //console.log(querySearch, cardForSearch,cardsFiltred, location.pathname);
      console.log('nothing search isCheckBox', isCheckBoxLocal);
      if (isCheckBoxLocal) {
        handleSearchCheckBox(cardsFiltred);
        console.log('trueCheckBox')
      } else {
        (location.pathname === '/movies') ? localStorage.setItem('query_movie', JSON.stringify(cardsFiltred)) : localStorage.setItem('query_SavedMovie', JSON.stringify(cardsFiltred));
        (location.pathname === '/movies') ? setCardsFiltredQuery(cardsFiltred.splice(0,movieCount)) : setCardsSavedFiltredQuery([...cardsFiltred.splice(0,50)]);
        if (cardsFiltred.length === 0 && location.pathname === '/saved-movies') {
          setNothingSavedFilm(true);
        } else {
          setNothingSavedFilm(false);
        }
        console.log('nothing search', cardsFiltred.length);
      }
      setIsPreloader(false);
      console.log('nothing search 1', cardsSavedFiltredQuery);
    };
  };

  // Обработчик переключателя короткометражек
  const handleCheckBoxButton = (e) => {
    e.preventDefault();
    (location.pathname === '/movies') ? setIsCheckBox(isCheckBox =>!isCheckBox) :  setIsCSavedMovieCheckBox(isSavedMovieCheckBox =>!isSavedMovieCheckBox);
    (location.pathname === '/movies') ? localStorage.setItem('isCheckBox', JSON.stringify(!isCheckBox)) : localStorage.setItem('isSavedMovieCheckBox', JSON.stringify(!isSavedMovieCheckBox));
    if (!isCheckBox) {
      console.log('nothing search 4', cardsSavedFiltredQuery.length);
      if  (location.pathname === '/movies')  {
        (cardsFiltredQuery.length !== 0)  ?  handleSearchCheckBox(JSON.parse(localStorage.getItem("query_movie"))) :  handleSearchCheckBox(cardsData);
      }
      if  (location.pathname === '/saved-movies')  {
        (cardsSavedFiltredQuery.length !== 0 && querySavedMovie !== '')  ?  handleSearchCheckBox(JSON.parse(localStorage.getItem("query_SavedMovie"))) :  handleSearchCheckBox(savedCards);
      }
    }  else {
      let cardForSearch = [];
      (location.pathname === '/movies') ? cardForSearch = cardsData : cardForSearch = savedCards;
      let querySearch = '';
      (location.pathname === '/movies') ? querySearch = query : querySearch = querySavedMovie;
      const cardsFiltred = cardForSearch.filter(card => card.nameRU.toLowerCase().includes(querySearch.toLowerCase()));
      console.log('nothing search 3', cardsFiltred.length);
      if (location.pathname === '/movies') localStorage.setItem('query_movie', JSON.stringify(cardsFiltred));
      (location.pathname === '/movies') ? setCardsFiltredQuery(cardsFiltred.splice(0,movieCount)) : setCardsSavedFiltredQuery(cardsFiltred.splice(0,50));
    }
  }


  // Обработчик переключателя короткометражек
  const handleSearchCheckBox = (cards) => {
    console.log('handleSearchCheckBox', cards);
    const cardsFiltred = cards.filter(card => card.duration < 40);
    if  (location.pathname === '/movies') localStorage.setItem('query_movie', JSON.stringify(cardsFiltred));
    if (cardsFiltred.length === 0 && location.pathname === '/saved-movies') {
      setNothingSavedFilm(true);
    } else {
      setNothingSavedFilm(false);
    }
    (location.pathname === '/movies') ? setCardsFiltredQuery(cardsFiltred.splice(0,movieCount)) : setCardsSavedFiltredQuery([...cardsFiltred.splice(0,50)]);
  }

  // функция удаления элемента из массива
  function removeItemOnce(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }


  // Обработчик постановки/снятия лайков
  function handleCardLike(card) {
    // ищем сначала сохранил ли пользователь карточку
    //console.log('handleCardLike1', idSavedCards, isLikedCard);
    const isSavedCard = idSavedCards.some(item => item === card.id);
    //console.log('handleCardLike2', isSavedCard, isLikedCard); 
    if (!isSavedCard) {
      //если пользователь не сохранял карточку, то добавляем ее в список сохраненных фильмов через apiMain
      // и ставим ей лайк, добавив ее в массив id сохраненных фильмов
      apiMain.postCard(card)
        .then((newCard) => {
          // добавляем карточку в список сохраненных фильмов
          setSavedCards([newCard.data, ...savedCards]);
          // добавляем id карточки в список id сохраненных фильмов
          setIdSavedCards([card.id, ...idSavedCards]);
          // присваиваем ее id статус лайк
          setIsLikedCard({...isLikedCard, [String(card.id)]: true});
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
    } else {
      //если пользователь сохранял карточку, значит дизлайк карточки
      // тогда присваиваем ее id статус дизлайк
      setIsLikedCard({...isLikedCard, [String(card.id)]: false});
      // удаляем id карточки из списка id сохраненных фильмов
      setIdSavedCards(removeItemOnce(idSavedCards, card.id));
      const findSavedCard = savedCards.find(item => item.movieId === card.id);
      // удаляем карточку из списка сохраненных фильмов через apiMain
      apiMain.deleteCard(findSavedCard._id)
        .then((data) => {
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
      // удаляем карточку из спискa сохраненных фильмов
      setSavedCards(removeItemOnce(savedCards, card));
    }
  }


  // Обработчик постановки/снятия лайков
  function handleCardDelete(card) {
    //если пользователь сохранял карточку, значит дизлайк карточки
    // удаляем карточку из списка сохраненных фильмов через apiMain
    apiMain.deleteCard(card._id)
      .then((data) => {
        // удаляем карточку из спискa сохраненных фильмов
        const newSavedCards = savedCards.filter((item) => item._id !== card._id);
        setSavedCards(newSavedCards);
        const newCardsSavedFiltredQuery = cardsSavedFiltredQuery.filter((item) => item._id !== card._id);
        setCardsSavedFiltredQuery(newCardsSavedFiltredQuery);  //if (querySavedMovie !== "")
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    // присваиваем ее id статус дизлайк
    setIsLikedCard({...isLikedCard, [String(card.movieId)]: false});
    // удаляем id карточки из списка id сохраненных фильмов
    setIdSavedCards(removeItemOnce(idSavedCards, card.movieId));
  }


  return (
    <main className="searchForm">
      <form className="searchForm__nav">
        <button type="button" className="searchForm__button-search searchForm__icon-search" ></button>
        <input required minLength="1" maxLength="30" id="name" name="name" type="text" placeholder="Фильм" className="searchForm__input-text"
          onChange={handleChangeQuery} value={(location.pathname === '/movies') ? query : querySavedMovie}/>
        <button type="button" className="searchForm__button-submit"  onClick={handleSearchQuery}></button>
      </form>
      <span id="search-input-error" className="searchForm__input-error">{errorText}</span>
      { (location.pathname === '/movies') &&
        <FilterCheckbox classTumbler={checkBoxButtonClassName} onClick={handleCheckBoxButton}/>
      }
      { (location.pathname === '/saved-movies') &&
        <FilterCheckbox classTumbler={checkBoxButtonClassNameSavedMovie} onClick={handleCheckBoxButton}/>
      }
      { (((cardsFiltredQuery.length === 0 || query === "")  && location.pathname === '/movies')) &&
        <p className="searchForm__message-nothing">Ничего не найдено</p>
      }
      { (nothingSavedFilm  && location.pathname === '/saved-movies') &&
        <p className="searchForm__message-nothing">Ничего не найдено</p>
      }
      { (isPreloader) &&
          <Preloader />
      }
      { ((query !== "" || sessionStorageQuery !== "") && cardsFiltredQuery.length !== 0  && (location.pathname === '/movies')) &&
        <section className="moviesList">
          <MoviesCardList isLikedCard={isLikedCard}
                          cards={cardsFiltredQuery}
                          onClickLike={handleCardLike}
          ></MoviesCardList>
        </section>
      }
      {  (location.pathname === '/saved-movies') &&
        <section className="moviesList">
          <MoviesCardList isLikedCard={isLikedCard}
                          cards={(querySavedMovie === ''  && isSavedMovieCheckBox) ? savedCards : cardsSavedFiltredQuery}
                          onClickLike={handleCardDelete}
          ></MoviesCardList>
        </section>
      }
      {((query !== "" || sessionStorageQuery !== "") && cardsFiltredQuery.length === movieCount && cardsFiltredQuery.length > 3 && (location.pathname === '/movies')) &&
        <ButtonMore onClick={handleRander}/>
      }
    </main>
  );
}

export default SearchForm;
