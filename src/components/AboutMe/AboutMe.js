import portretUser from '../../images/portret.svg';
import { Link } from 'react-router-dom';

function AboutMe() {

  return (
    <section className="aboutMe" id='aboutMe'>
      <h2 className={'section__header'}>Студент</h2>
      <div className={'aboutMe__info-container'}>
      <div className={'aboutMe__info'}>
        <h3 className={'aboutMe__header'}>Дарья</h3>
        <h4 className={'aboutMe__subtitle'}>Фронтенд-разработчик, 30 лет</h4>
        <p className={'aboutMe__text'}>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании 
            «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <div className={'aboutMe__nav'}>
          <a href="https://en.wikipedia.org/wiki/Facebook" rel="noopener noreferrer" target="_blank" className="aboutMe__link">Facebook</a>
          <a href="https://github.com/DariaKamenskaya" rel="noopener noreferrer" target="_blank" className="aboutMe__link">Github</a>
        </div>
      </div>
      <img src={portretUser} alt="Портрет пользователя" className="aboutMe__photo"/>
      </div>
    </section>
  );
}
  
export default AboutMe;