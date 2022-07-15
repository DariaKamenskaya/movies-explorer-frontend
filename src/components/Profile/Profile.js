import { useNavigate } from 'react-router-dom';

import React, { useState, useCallback, useEffect } from 'react';
import HeaderMovies from '../HeaderMovies/HeaderMovies';
import * as auth from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function Profile(props) {

  // Подписываемся на контекст CurrentUserContext
  const userData = React.useContext(CurrentUserContext);


  const [values, setValues] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);


  //функция проверки валидности емайла
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /\S+@\S+\.\S+/
      );
  };

  // Обработчик изменения инпута обновляет стейт
  const handleChange = (e) => {
    const { name, value } = e.target;
    const target = e.target;
    if (value === userData.name || value === userData.email) {
      setValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors({...errors, [name]: 'Введенное значение совпадает с текущими данными' });
      setIsValid(false);
    } else {
      setValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    }
    if (name === 'email' && !validateEmail(value)  &&  value !== "") {
      setErrors({...errors, [name]: target.validationMessage, 'email': 'Невалидный email' });
      setIsValid(false);
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );


  useEffect(() => {
    const initialValue = {
      name: userData.name,
      email: userData.email,
    }
    const initialErrors = {
      name: '',
      email: '',
    }
    resetForm(initialValue,initialErrors,false);
  }, [userData])


  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .patchUserMe(
        values
      )
      .then((res) => {
        if(res.data){
          setIsOpenPopup(true);
          userData.name = values.name;
        } else {
          setErrors({...errors,  'email': res.message });
          setIsValid(false);
        }
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
        if (err === 'Что-то пошло не так: 409')  setErrors({...errors,  'email': 'Пользователь с таким email уже зарегестрирован' });
        return [];
      });
  };


  function closePopup() {
    props.handleNewData(values); 
    setIsOpenPopup(false);
  };



  return (
    <div >
      <HeaderMovies/>
      <h1 className="welcome-title">{`Привет, ${userData.name}!`}</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__form-input profile__form-input_border">
          <label className="profile__form-text">{"Имя"}</label>
          <input required
                 id="name"
                 name="name"
                 type="text"
                 placeholder="Имя"
                 className="profile__form-text profile__form-text_input"
                 value={values.name} 
                 onChange={handleChange} />
        </div>
        <span id="form-input-error" className="form__input-error">{errors.name}</span>
        <div className="profile__form-input">
          <label className="profile__form-text">{"Email"}</label>
          <input required
                 id="email"
                 name="email"
                 type="email"
                 placeholder="Email"
                 className="profile__form-text profile__form-text_input"
                 value={values.email}
                 onChange={handleChange} />
        </div>
        <span id="form-input-error" className="form__input-error">{errors.email}</span>
        <div className="profile__button-container">
          <button type="submit" className= {isValid ?  "welcome-link" : "welcome-link welcome-link_grey"} disabled={!isValid} >Редактировать</button>
          <button type="button" className= {"welcome-link welcome-link_red"} onClick={props.handleResetData}>{'Выйти из аккаунта'}</button>
        </div>
      </form>
      <PopupWithForm name="delete" title="Данные успешно изменены!"  onClosePopup={closePopup} isOpen={isOpenPopup}></PopupWithForm>
    </div>
  );
}
  
export default Profile;