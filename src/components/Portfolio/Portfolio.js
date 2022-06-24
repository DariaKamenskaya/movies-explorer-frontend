import { Link } from 'react-router-dom';

function Portfolio() {

  return (
    <section className="portfolio">
      <h3 className={'portfolio__header'}>Портфолио</h3>
      <div className={'portfolio__nav'}>
        <li className={'portfolio__nav-element'}>
          <h4 className={'portfolio__link'}>Статичный сайт</h4>
          <a href="https://dariakamenskaya.github.io/how-to-learn" rel="noopener noreferrer" target="_blank" className="portfolio__link">{'↗'}</a>
        </li>
        <li className={'portfolio__nav-element'}>
          <h4 className={'portfolio__link'}>Адаптивный сайт</h4>
          <a href="https://dariakamenskaya.github.io/russian-travel_kdd/index.html" rel="noopener noreferrer" target="_blank" className="portfolio__link">{'↗'}</a>
        </li>
        <li className={'portfolio__nav-element'}>
          <h4 className={'portfolio__link'}>Одностраничное приложение</h4>
          <a href="https://dariakamenskaya.github.io/mesto/index.html" rel="noopener noreferrer" target="_blank" className="portfolio__link">{'↗'}</a>
        </li>
      </div>
    </section>
  );
}
  
export default Portfolio;