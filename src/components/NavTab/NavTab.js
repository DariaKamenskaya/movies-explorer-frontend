// Пути к изображениям внутри сборки
import { Link } from 'react-router-dom';

function NavTab() {

  return (
    <header className="navTab">
      <div className={'navTab__menu'}>
        <a href="#aboutProject" className="navTab__link">О проекте</a>
        <a href="#techs" className="navTab__link">Технологии</a>
        <a href="#aboutMe" className="navTab__link">Студент</a>
      </div>
    </header>
  );
}

export default NavTab;