import React, { useEffect, useState } from 'react';
// Импорт модулей
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
import { CurrentUserContext } from './contexts/CurrentUserContext';
import * as auth from './utils/auth';
import useWindowDimensions  from './utils/windowsUpdate';
import RequireAuth from './utils/RequireAuth';




function App() {

  const {windowSize, movieCount} = useWindowDimensions();
    // стейт для ширины экрана
/*     const [windowSize, setWindowSize] = useState(1280);
    // Стейт, в котором содержится значение генерируемых карточек
    const [movieCount, setMovieCount] = useState(8); */


  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  // Стейт, в котором содержится значение инпута
  const [loggedIn, setLoggedIn] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

  const updateMovies = (cards) => {
    setCards(cards);
    localStorage.setItem('all_movie', JSON.stringify(cards));
  }

  useEffect(() => {
    // проверка токена 
    handleTokenCheck(location.pathname);
    // запрос в API за пользовательскими данными
    if (loggedIn){
      Promise.all([ 
      auth.getUserData(),
      apiBeatfilmMovies.getInitialMovies()
      ])
      .then((res) => {
        //console.log('useEffect' , loggedIn, res, location.pathname);
        setCurrentUser(res[0].data);
        updateMovies(res[1]); 
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
        return [];
      })}
  }, [loggedIn]);


  const handleTokenCheck = (path) => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      // проверяем токен пользователя
      auth.checkToken(jwt).then((res) => {
        if (res.data) {
          // если есть цель, добавляем её в стейт
          setLoggedIn(true);
          navigate(path);
        }
      });
    }
  };


/*   useEffect(() => {
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
  }, []); */

/*   useEffect(() => {
    useWindowDimensions()
      .then((res) => {
        setWindowSize(res.windowSize);
        setMovieCount (res.movieCount);
      }
      )
  }, [windowSize]) */


  const handleLogin = (email) => {
    setLoggedIn(true);
  };



  const handleLogOut = () => {
    setLoggedIn(false);
    setCurrentUser([]);
    setCards([]);
    localStorage.clear();
    navigate('/');
  };

































  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {(!loggedIn) ? <Header/> : <HeaderMovies/> }
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
            <RequireAuth loggedIn={loggedIn}>
            <div>
              <CurrentCardsContext.Provider value={cards}>
                <HeaderMovies/> 
                <SearchForm  windowSize={windowSize} movieCount={movieCount} />
                <Footer/>
              </CurrentCardsContext.Provider>
            </div>
            </RequireAuth>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <RequireAuth loggedIn={loggedIn}>
            <div>
              <HeaderMovies/> 
              <SearchForm/> 
              <Footer/>
            </div>
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth loggedIn={loggedIn}>
              <Profile handleResetData={handleLogOut}/>
            </RequireAuth>
          } 
        />
        <Route
          path="/signin" 
          element={<Login onLogin={handleLogin}/>} 
        />
        <Route
          path="/signup"
          element={<Register onLogin={handleLogin}/>}
        />
      </Routes>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
