import React from 'react';
// Импорт модулей
import { Route, Routes } from 'react-router-dom';
import AboutMe from './components/AboutMe/AboutMe';
import AboutProject from './components/AboutProject/AboutProject';
import Footer from './components/Footer/Footer';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './components/Header/Header';
import NavTab from './components/NavTab/NavTab';
import Portfolio from './components/Portfolio/Portfolio';
import Promo from './components/Promo/Promo';
import Techs from './components/Techs/Techs';
import HeaderMovies from './components/HeaderMovies/HeaderMovies';
import SearchForm from './components/SearchForm/SearchForm';



function App() {
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
            <HeaderMovies/> 
            <SearchForm/> 
           {/* <Cards/> */}
            <Footer/>
          </div>
        }
      />
      {/* <Route path="/sign-up" element={<Register/>} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/movies" element={<Register/>} />
      <Route path="/saved-movies" element={<Register/>} />
      <Route path="/profile" element={<Register/>} /> */}
    </Routes>
  </div>
  );
}

export default App;
