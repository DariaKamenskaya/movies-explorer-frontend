import React from 'react';
// Импорт модулей
import { Route, Routes } from 'react-router-dom';
import AboutProject from './components/AboutProject/AboutProject';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './components/Header/Header';
import NavTab from './components/NavTab/NavTab';
import Promo from './components/Promo/Promo';



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
            {/* <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} 
                       onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} 
                       setCards={setCurrentCards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                  <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
                  <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
                  <AddPlacePopup   isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/> 
               <Footer />
               <ImagePopup  card={selectedCard}  onClosePopup={closeAllPopups}/>
               <PopupWithForm name="delete" title="Вы уверены?"  onClosePopup={closeAllPopups}>
                 <button className="popup__submit-btn popup__submit-btn_delete"  type="submit">
                   Да
                 </button> 
               </PopupWithForm> */}
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
