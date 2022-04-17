// Пути к изображениям внутри сборки
import { Link } from 'react-router-dom';

function NavTab() {

  return (
    <header className="navTab">
        <div className={'navTab__menu'}>
          <Link to={'/sign-up'} className={'navTab__link'}>{'О проекте'}</Link>
          <Link to={'/sign-in'} className={'navTab__link'}>{'Технологии'}</Link>
          <Link to={'/sign-in'} className={'navTab__link'}>{'Студент'}</Link>
        </div>
    </header>
  );
}

export default NavTab;