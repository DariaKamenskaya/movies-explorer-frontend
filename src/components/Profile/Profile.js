import { Link } from 'react-router-dom';
import HeaderMovies from '../HeaderMovies/HeaderMovies';

function Profile() {

  return (
    <div >
      <HeaderMovies/>
      <h1 className="welcome-title">Привет, Виталий!</h1>
      <form className="profile__form">
        <div className="profile__form-input profile__form-input_border">
          <label className="profile__form-text">{"Имя"}</label>
          <input required id="name" name="name" type="text" placeholder="Имя" className="profile__form-text profile__form-text_input"
            value={"Виталий"} />
        </div>
        <div className="profile__form-input">
          <label className="profile__form-text">{"Email"}</label>
          <input required id="email" name="email" type="email" placeholder="Email" className="profile__form-text profile__form-text_input"
            value={"pochta@yandex.ru"} />
        </div>
        <div className="profile__button-container">
          <button type="submit" className="welcome-link" >Редактировать</button>
          <Link to={'/'} className={'welcome-link welcome-link_red'}>{'Выйти из аккаунта'}</Link>
        </div>
      </form>
    </div>
  );
}
  
export default Profile;