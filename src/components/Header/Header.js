// Пути к изображениям внутри сборки
import { Link } from 'react-router-dom';
import logoUser from '../../images/logo_user.svg'; 

function Header() {

  return (
    <header className="header">
      <div className="header__nav">
        <button href="#" className="header__link"><img src={logoUser} alt="Логотип" className="header__logo"/></button>
        <div className="header__nav_right">
          <Link to={'/'} className={'header__link header__status'}>{'Регистрация'}</Link>
          <Link to={'/'} className={'header__link header__status'}>{'Войти'}</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;