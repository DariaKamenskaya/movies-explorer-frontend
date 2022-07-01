import {baseUrlApiMain} from "../utils/constant";


// класс для работы с ApiMain
class mainAPI {

  constructor(url) {
    this._url = url;
  }


  // метод инициализации карточек
  getInitialCards() {
    return fetch(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}` // this._token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  // добавление на сервере новой карточки
  postCard(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`, // this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: (data.country === null) ? 'country' : data.country,
        director: data.director,
        duration: data.duration,
        year: Number(data.year),
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: (data.nameEN === '') ? 'data.nameEN' : data.nameEN,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }); 
  }

  // метод удаления карточек
  deleteCard(idCard) {
    return fetch(`${this._url}/movies/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}` // this._token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

}


// экземпляр класса для работы с  ApiMain
// mainAPI для получение данных
export const apiMain = new mainAPI(baseUrlApiMain);