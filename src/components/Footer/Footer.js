import { Link } from 'react-router-dom';

function Footer() {
  return (
  <footer className="footer">
    <h3 className="footer__subtitle">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
    <div className="footer__info">
    <p className="footer__text">&copy; 2022</p>
    <nav className="footer__nav">
      <a href="https://practicum.yandex.ru/" rel="noopener noreferrer" target="_blank" className="footer__link">Яндекс.Практикум</a>
      <a href="https://github.com/DariaKamenskaya" rel="noopener noreferrer" target="_blank" className="footer__link">Github</a>
      <a href="https://en.wikipedia.org/wiki/Facebook" rel="noopener noreferrer" target="_blank" className="footer__link">Facebook</a>
      {/* <Link to={'/sign-up'} className="footer__link">Яндекс.Практикум</Link>
      <Link to={'/sign-up'} className="footer__link">Github</Link>
      <Link to={'/sign-up'} className="footer__link">Facebook</Link> */}
    </nav>
    </div>
  </footer>
  );
}
  
export default Footer;