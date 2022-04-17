// Пути к изображениям внутри сборки
import { Link } from 'react-router-dom';
import logoUser from '../../images/logo_user.svg'; 

function Header() {

  return (
    <header className="header">
      <div className="header__nav">
        <img src={logoUser} alt="Логотип пользователя" className="header__logo"/>
        <div className="header__nav_right">
          <Link to={'/sign-up'} className={'header__link header__link_reg'}>{'Регистрация'}</Link>
          <button className="header__button"> <Link to={'/sign-in'} className={'header__link'}>{'Войти'}</Link></button>
        </div>
      </div>
    </header>
  );
}

export default Header;