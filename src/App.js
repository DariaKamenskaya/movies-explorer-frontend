import React, { useEffect, useState } from 'react';
// Импорт модулей
import { Route, Routes } from 'react-router-dom';
import AboutMe from './components/AboutMe/AboutMe';
import AboutProject from './components/AboutProject/AboutProject';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NavTab from './components/NavTab/NavTab';
import Portfolio from './components/Portfolio/Portfolio';
import Promo from './components/Promo/Promo';
import Techs from './components/Techs/Techs';
import HeaderMovies from './components/HeaderMovies/HeaderMovies';
import SearchForm from './components/SearchForm/SearchForm';
import MoviesCardList from './components/MoviesCardList/MoviesCardList';
import ButtonMore from './components/ButtonMore/ButtonMore';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import  {apiBeatfilmMovies}  from './utils/MoviesApi';
import {CurrentCardsContext}  from './contexts/CurrentCardsContext';

import useWindowDimensions  from './utils/windowsUpdate';




function App() {

  const {windowSize, movieCount} = useWindowDimensions();
    // стейт для ширины экрана
/*     const [windowSize, setWindowSize] = useState(1280);
    // Стейт, в котором содержится значение генерируемых карточек
    const [movieCount, setMovieCount] = useState(8); */


  const [cards, setCards] = useState([]);

  const updateMovies = (cards) => {
    setCards(cards);
    localStorage.setItem('all_movie', JSON.stringify(cards));
  }

  useEffect(() => {
    // const cards = JSON.parse(localStorage.getItem('all_movie' || '[]'));
    if (!cards.length) {
      // запрос в API за пользовательскими данными
      apiBeatfilmMovies.getInitialMovies()
        .then((res) => {
          updateMovies(res)
        })
        .catch((err) => {
          console.log(err); // "Что-то пошло не так: ..."
          return [];
        })
    } else {
      setCards(cards);
    }
  }, []);

/*   useEffect(() => {
    useWindowDimensions()
      .then((res) => {
        setWindowSize(res.windowSize);
        setMovieCount (res.movieCount);
      }
      )
  }, [windowSize]) */








































  return (
  <div className="page">
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Header/> 
            <Promo/> 
            <NavTab/> 
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
            <Footer/>
          </div>
        }
      />
      <Route
        path="/movies"
        element={
          <div>
            <CurrentCardsContext.Provider value={cards}>
              <HeaderMovies/> 
              <SearchForm  windowSize={windowSize} movieCount={movieCount} />
              <Footer/>
            </CurrentCardsContext.Provider>
          </div>
        }
      />
      <Route
        path="/saved-movies"
        element={
          <div>
            <HeaderMovies/> 
            <SearchForm/> 
            {/* <MoviesCardList cardButtonClassName={'moviesCard__close-button'}/> */}
            <Footer/>
          </div>
        }
      />
      <Route
        path="/profile"
        element={<Profile/>} 
      />
      <Route
        path="/signin" 
        element={<Login/>} 
      />
      <Route
        path="/signup"
        element={<Register/>}
      />
    </Routes>
  </div>
  );
}

export default App;
