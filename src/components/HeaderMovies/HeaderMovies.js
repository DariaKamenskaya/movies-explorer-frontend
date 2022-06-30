// Пути к изображениям внутри сборки
import { Link } from 'react-router-dom';
import logoUser from '../../images/logo_user.svg'; 
import iconUser from '../../images/iconUser.svg'; 
import iconMenu from '../../images/iconMenu.svg'; 

function HeaderMovies() {

  return (
    <header className="header_movies">
      <div className="header__nav">
      <Link to={'/'}><img src={logoUser} alt="Логотип пользователя" className="header__logo"/></Link>
        <div className="header__nav-right header__nav-right_movie">
          <div className="header__nav-link">
            <Link to={'/movies'} className={'header__link header__link_reg header__link_movies'}>{'Фильмы'}</Link>
            <Link to={'/saved-movies'} className={'header__link header__link_reg header__link_movies'}>{'Сохраненные фильмы'}</Link>
          </div>
          <button className="header__button header__button_icon">
            <Link to={'/profile'} className={'header__link header__link_reg header__link_icon'}>{'Аккаунт'}</Link>
            <img src={iconUser} alt="Иконка пользователя" className="header__icon"/>
          </button>
        </div>
        <button className="header__nav-mobile">
            <img src={iconMenu} alt="Иконка меню" className="header__icon-menu"/>
          </button>
      </div>
    </header>
  );
}

export default HeaderMovies;