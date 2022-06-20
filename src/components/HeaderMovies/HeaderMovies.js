// Пути к изображениям внутри сборки
import { Link } from 'react-router-dom';
import logoUser from '../../images/logo_user.svg'; 
import iconUser from '../../images/iconUser.svg'; 

function HeaderMovies() {

  return (
    <header className="header_movies">
      <div className="header__nav">
        <img src={logoUser} alt="Логотип пользователя" className="header__logo"/>
        <div className="header__nav_right">
          <div className="header__nav_link">
            <Link to={'/sign-up'} className={'header__link header__link_reg header__link_movies'}>{'Фильмы'}</Link>
            <Link to={'/sign-up'} className={'header__link header__link_reg header__link_movies'}>{'Сохраненные фильмы'}</Link>
          </div>
          <button className="header__button header__button_icon">
            <Link to={'/sign-in'} className={'header__link header__link_reg header__link_icon'}>{'Аккаунт'}</Link>
            <img src={iconUser} alt="Иконка пользователя" className="header_icon"/>
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderMovies;