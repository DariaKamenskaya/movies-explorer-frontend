import { Link } from 'react-router-dom';

function Portfolio() {

  return (
    <section className="portfolio">
      <h3 className={'portfolio__header'}>Портфолио</h3>
      <div className={'portfolio__nav'}>
        <li className={'portfolio__nav-element'}>
          <h4 className={'portfolio__link'}>Статичный сайт</h4>
          <Link to={'/sign-up'} className={'portfolio__link'}>{'↗'}</Link>
        </li>
        <li className={'portfolio__nav-element'}>
          <h4 className={'portfolio__link'}>Адаптивный сайт</h4>
          <Link to={'/sign-up'} className={'portfolio__link'}>{'↗'}</Link>
        </li>
        <li className={'portfolio__nav-element'}>
          <h4 className={'portfolio__link'}>Одностраничное приложение</h4>
          <Link to={'/sign-up'} className={'portfolio__link'}>{'↗'}</Link>
        </li>
      </div>
    </section>
  );
}
  
export default Portfolio;