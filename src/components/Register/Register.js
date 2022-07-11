import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';
import logoUser from '../../images/logo_user.svg'; 
import * as auth from '../../utils/auth';

function Register({ onLogin }) {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const navigate = useNavigate();

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
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({...errors, [name]: target.validationMessage });
    if (value === "") {
      setErrors({...errors, [name]: 'Это поле необходимо заполнить'});
    }
    setIsValid(target.closest("form").checkValidity());
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



  const handleSubmit = (e) => {
    e.preventDefault();
    auth
        .createUser(
          values.name,
          values.email,
          values.password
        )
        .then((res) => {
          if(res.data){
            // содадим токен
            auth
            .authorize(values.email, values.password)
            .then((res) => {
              if (res.token) {
                setValues({
                  email: "",
                  password: "",
                })
                localStorage.setItem('jwt', res.token);
                onLogin(values.email);  // обновляем стейт внутри App.js
                navigate('/movies');
              }
            })
            .catch((err) => console.log(err.message));
          } else {
            setErrors({...errors,  'email': res.message });
            setIsValid(true);
          }
        })
        .catch((err) => {
          console.log(err); // "Что-то пошло не так: ..."
          return [];
        });
  };



  useEffect(() => {
    const initialValue = {
      name: '',
      email: '',
      password: ''
    }
    const initialErrors = {
      name: '',
      email: '',
      password: ''
    }
    resetForm(initialValue,initialErrors,false);
  }, [])


  return (
    <div>
      <Link to={'/'}><img src={logoUser} alt="Логотип пользователя" className="welcome__logo"/></Link>
      <h1 className="welcome-title welcome-title_login">Добро пожаловать!</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__form-input">
          <label className="login__label-text">{"Имя"}</label>
          <input  required="required"
                  minLength="2"
                  maxLength="40" 
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Имя"
                  className="login__input-text"
                  value={values.name}
                  onChange={handleChange}/>
          <span id="form-input-error" className="form__input-error">{errors.name}</span>
        </div>
        <div className="login__form-input">
          <label className="login__label-text">{"Email"}</label>
          <input required
                 id="email"
                 name="email"
                 type="email"
                 placeholder="Email"
                 className="login__input-text"
                 value={values.email}
                 onChange={handleChange}/>
          <span id="form-input-error" className="form__input-error">{errors.email}</span>
        </div>
        <div className="login__form-input">
          <label className="login__label-text">{"Пароль"}</label>
          <input required
                 id="password"
                 name="password"
                 type="password"
                 placeholder="Пароль"
                 className="login__input-text"
                 value={values.password}
                 onChange={handleChange}/>
          <span id="form-input-error" className="form__input-error">{errors.password}</span>
        </div>
        <button type="submit" className= {isValid ?  "login__button-active" : "login__button-inactive"} disabled={!isValid} >Зарегистрироваться</button>
      </form>
      <div className="login__link-container">
        <p className="welcome-link welcome-link_grey">Уже зарегистрированы?</p>
        <Link to={'/signin'} className={'welcome-link welcome-link_blue'}>{'Войти'}</Link>
      </div>
    </div>
  );
}
  
export default Register;