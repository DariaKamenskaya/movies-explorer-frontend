import { Link } from 'react-router-dom';
import logoUser from '../../images/logo_user.svg'; 

function Register() {

  return (
    <div>
      <Link to={'/'}><img src={logoUser} alt="Логотип пользователя" className="welcome__logo"/></Link>
      <h1 className="welcome-title welcome-title_login">Добро пожаловать!</h1>
      <form className="login__form">
        <div className="login__form-input">
          <label className="login__label-text">{"Имя"}</label>
          <input required id="name" name="name" type="text" placeholder="Имя" className="login__input-text"
            value={"Виталий"} />
        </div>
        <div className="login__form-input">
          <label className="login__label-text">{"Email"}</label>
          <input required id="email" name="email" type="email" placeholder="Email" className="login__input-text"
            value={"pochta@yandex.ru"} />
        </div>
        <div className="login__form-input">
          <label className="login__label-text">{"Пароль"}</label>
          <input required id="password" name="password" type="password" placeholder="Пароль" className="login__input-text"
            value={"Виталий"} />
        </div>
        <button type="submit" className="login__button" >Зарегистрироваться</button>
      </form>
      <div className="login__link-container">
        <p className="welcome-link welcome-link_grey">Уже зарегистрированы?</p>
        <Link to={'/signin'} className={'welcome-link welcome-link_blue'}>{'Войти'}</Link>
      </div>
    </div>
  );
}
  
export default Register;