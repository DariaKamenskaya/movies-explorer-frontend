import logoPractikum from '../../images/landing-logo_1280.svg'; 

function Promo() {

  return (
    <header className="promo">
        <img src={logoPractikum} alt="Логотип практикума" className="promo__logo"/>
        <p className="promo__text">Учебный проект студента факультета Веб-разработки.</p>
    </header>
  );
}

export default Promo;